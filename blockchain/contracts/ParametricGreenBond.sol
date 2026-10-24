// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ParametricGreenBond
 * @notice Escrows municipal/institutional green bond capital and programmatically
 *         releases funding tranches upon cryptographic telemetry verification.
 * @dev Tranche 1: Site Prep & Excavation (immediate 30%)
 *      Tranche 2: Bioswale & Miyawaki Planting (40% upon drone / GeoJSON execution proof)
 *      Tranche 3: Ecological Performance & Canopy Health (30% upon Sentinel-2 NDVI gain)
 */
contract ParametricGreenBond {
    enum ProjectMilestone { Initialized, Tranche1Released, Tranche2Released, FullyExecuted }

    struct GreenBond {
        bytes32 planDigest;
        address municipalBeneficiary;
        address investor;
        uint256 principalAmount;
        uint256 couponRateBps;       // Basis points (e.g. 450 = 4.5% p.a.)
        uint256 maturityDate;
        ProjectMilestone currentStage;
        bool isDefaulted;
    }

    address public owner;
    mapping(bytes32 => GreenBond) public bonds;

    event BondIssued(bytes32 indexed planDigest, address indexed beneficiary, uint256 amount);
    event TrancheReleased(bytes32 indexed planDigest, uint8 trancheNumber, uint256 payoutAmount);
    event BondMatured(bytes32 indexed planDigest, uint256 totalRepaid);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only authorized oracle");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function issueBond(
        bytes32 _planDigest,
        address _beneficiary,
        uint256 _couponBps,
        uint256 _durationYears
    ) external payable {
        require(msg.value > 0, "Principal must be > 0");
        require(bonds[_planDigest].principalAmount == 0, "Bond exists for plan");

        bonds[_planDigest] = GreenBond({
            planDigest: _planDigest,
            municipalBeneficiary: _beneficiary,
            investor: msg.sender,
            principalAmount: msg.value,
            couponRateBps: _couponBps,
            maturityDate: block.timestamp + (_durationYears * 365 days),
            currentStage: ProjectMilestone.Initialized,
            isDefaulted: false
        });

        emit BondIssued(_planDigest, _beneficiary, msg.value);
    }

    /**
     * @notice Releases Tranche 1 (30% for mobilization and ground preparation).
     */
    function releaseTranche1(bytes32 _planDigest) external onlyOwner {
        GreenBond storage bond = bonds[_planDigest];
        require(bond.currentStage == ProjectMilestone.Initialized, "Invalid state");

        bond.currentStage = ProjectMilestone.Tranche1Released;
        uint256 payout = (bond.principalAmount * 30) / 100;
        payable(bond.municipalBeneficiary).transfer(payout);

        emit TrancheReleased(_planDigest, 1, payout);
    }

    /**
     * @notice Releases Tranche 2 (40% upon physical installation verification).
     */
    function releaseTranche2(bytes32 _planDigest) external onlyOwner {
        GreenBond storage bond = bonds[_planDigest];
        require(bond.currentStage == ProjectMilestone.Tranche1Released, "Invalid state");

        bond.currentStage = ProjectMilestone.Tranche2Released;
        uint256 payout = (bond.principalAmount * 40) / 100;
        payable(bond.municipalBeneficiary).transfer(payout);

        emit TrancheReleased(_planDigest, 2, payout);
    }

    /**
     * @notice Releases Tranche 3 (Final 30% upon Sentinel-2 NDVI canopy & retention verification).
     */
    function releaseTranche3(bytes32 _planDigest) external onlyOwner {
        GreenBond storage bond = bonds[_planDigest];
        require(bond.currentStage == ProjectMilestone.Tranche2Released, "Invalid state");

        bond.currentStage = ProjectMilestone.FullyExecuted;
        uint256 payout = address(this).balance >= ((bond.principalAmount * 30) / 100)
            ? (bond.principalAmount * 30) / 100
            : address(this).balance;
        payable(bond.municipalBeneficiary).transfer(payout);

        emit TrancheReleased(_planDigest, 3, payout);
    }

    receive() external payable {}
}
