// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EcoEvidenceRegistry
 * @notice Immutable on-chain registry for verified urban ecological intervention plans,
 *         cryptographic telemetry baselines (RFC-8785 Keccak-256 digests), and IPFS CID anchoring.
 * @dev Part of the EcoPlanar-Chain Nature-Based Solutions (NbS) Protocol for IEEE ClimateChain 2026.
 */
contract EcoEvidenceRegistry {
    struct EcologicalPlan {
        bytes32 planDigest;          // Keccak-256 digest of RFC-8785 canonical JSON payload
        string ipfsCid;              // IPFS CIDv1 storing full GeoJSON & DPR data
        address submitter;           // Municipal planner or organization address
        uint256 siteAreaSqM;         // Physical boundary area in square meters
        int32 latCentroidE6;         // Latitude centroid scaled by 1e6
        int32 lngCentroidE6;         // Longitude centroid scaled by 1e6
        uint16 baselineImpervious;   // Scaled percentage (0-10000 = 0.00% to 100.00%)
        uint16 projectedRunoffRed;   // Projected stormwater runoff reduction (0-10000)
        uint32 projectedCO2SeqKgYr;  // Projected annual CO2 sequestration in kg
        uint256 timestamp;           // Block timestamp of attestation
        bool isVerified;             // Status of third-party / satellite verification
    }

    address public owner;
    mapping(bytes32 => EcologicalPlan) public plans;
    mapping(bytes32 => bool) public registeredCentroids; // Anti-double claiming: hash(latE6, lngE6)
    bytes32[] public allPlanDigests;

    event PlanRegistered(
        bytes32 indexed planDigest,
        string ipfsCid,
        address indexed submitter,
        uint256 siteAreaSqM,
        uint32 projectedCO2SeqKgYr,
        uint256 timestamp
    );

    event PlanVerified(
        bytes32 indexed planDigest,
        address indexed verifier,
        uint256 timestamp
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can invoke");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Registers a new canonical ecological intervention plan.
     * @param _planDigest Keccak-256 hash of canonical RFC-8785 intervention payload.
     * @param _ipfsCid IPFS CID pointing to the immutable Detailed Project Report (DPR).
     * @param _siteAreaSqM Area of the intervention site in square meters.
     * @param _latE6 Latitude centroid * 1e6.
     * @param _lngE6 Longitude centroid * 1e6.
     * @param _baselineImpervious Baseline impervious surface percentage * 100.
     * @param _projectedRunoffRed Projected runoff reduction percentage * 100.
     * @param _projectedCO2SeqKgYr Projected annual CO2 sequestered in kg.
     */
    function registerPlan(
        bytes32 _planDigest,
        string calldata _ipfsCid,
        uint256 _siteAreaSqM,
        int32 _latE6,
        int32 _lngE6,
        uint16 _baselineImpervious,
        uint16 _projectedRunoffRed,
        uint32 _projectedCO2SeqKgYr
    ) external {
        require(_planDigest != bytes32(0), "Invalid plan digest");
        require(bytes(_ipfsCid).length > 0, "Empty IPFS CID");
        require(plans[_planDigest].timestamp == 0, "Plan already registered");

        // Anti-double-claiming guard: verify geographic centroid collision
        bytes32 centroidKey = keccak256(abi.encodePacked(_latE6, _lngE6));
        require(!registeredCentroids[centroidKey], "Centroid already registered for active plan");

        plans[_planDigest] = EcologicalPlan({
            planDigest: _planDigest,
            ipfsCid: _ipfsCid,
            submitter: msg.sender,
            siteAreaSqM: _siteAreaSqM,
            latCentroidE6: _latE6,
            lngCentroidE6: _lngE6,
            baselineImpervious: _baselineImpervious,
            projectedRunoffRed: _projectedRunoffRed,
            projectedCO2SeqKgYr: _projectedCO2SeqKgYr,
            timestamp: block.timestamp,
            isVerified: false
        });

        registeredCentroids[centroidKey] = true;
        allPlanDigests.push(_planDigest);

        emit PlanRegistered(
            _planDigest,
            _ipfsCid,
            msg.sender,
            _siteAreaSqM,
            _projectedCO2SeqKgYr,
            block.timestamp
        );
    }

    /**
     * @notice Attests satellite / MRV verification of the physical interventions.
     */
    function attestVerification(bytes32 _planDigest) external onlyOwner {
        require(plans[_planDigest].timestamp != 0, "Plan does not exist");
        require(!plans[_planDigest].isVerified, "Already verified");

        plans[_planDigest].isVerified = true;
        emit PlanVerified(_planDigest, msg.sender, block.timestamp);
    }

    /**
     * @notice Returns total registered plans count.
     */
    function getPlanCount() external view returns (uint256) {
        return allPlanDigests.length;
    }

    /**
     * @notice Computes and verifies an off-chain canonical digest against stored plan.
     */
    function verifyDigest(bytes32 _planDigest) external view returns (bool exists, bool verified, string memory ipfsCid) {
        EcologicalPlan memory p = plans[_planDigest];
        return (p.timestamp != 0, p.isVerified, p.ipfsCid);
    }
}
