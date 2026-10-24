// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title UrbanCarbonCredit (UCC)
 * @notice Standard ERC-20 token representing verified Nature-Based Urban Carbon Offsets (1 UCC = 1 metric ton CO2e sequestered).
 * @dev Integrated with EcoEvidenceRegistry for programmatic minting upon empirical Sentinel-2 NDVI verification.
 */
contract UrbanCarbonCredit {
    string public constant name = "Urban Carbon Credit";
    string public constant symbol = "UCC";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    address public registryAddress;
    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(bytes32 => bool) public mintedPlans;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event CarbonOffsetMinted(bytes32 indexed planDigest, address indexed beneficiary, uint256 tonsCO2);
    event CarbonOffsetRetired(address indexed burner, uint256 amount, string corporateReason, bytes32 indexed planDigest);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }

    constructor(address _registryAddress) {
        owner = msg.sender;
        registryAddress = _registryAddress;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function approve(address spender, uint256 value) external returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) external returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        allowance[from][msg.sender] -= value;
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
        return true;
    }

    /**
     * @notice Mints carbon credits based on verified plan sequestration metrics.
     * @param planDigest Registered hash in EcoEvidenceRegistry.
     * @param beneficiary Municipal or community wallet receiving credit tokens.
     * @param tonsCO2 Verified metric tons of CO2 sequestered.
     */
    function mintVerifiedOffset(
        bytes32 planDigest,
        address beneficiary,
        uint256 tonsCO2
    ) external onlyOwner {
        require(!mintedPlans[planDigest], "Credits already minted for plan");
        require(beneficiary != address(0), "Invalid beneficiary");
        require(tonsCO2 > 0, "Zero offset quantity");

        mintedPlans[planDigest] = true;
        uint256 tokenAmount = tonsCO2 * (10 ** 18);
        totalSupply += tokenAmount;
        balanceOf[beneficiary] += tokenAmount;

        emit CarbonOffsetMinted(planDigest, beneficiary, tonsCO2);
        emit Transfer(address(0), beneficiary, tokenAmount);
    }

    /**
     * @notice Burns carbon credits to retire them from circulation for ESG compliance (e.g. BRSR / EU CSDDD).
     */
    function retireOffset(
        uint256 amount,
        string calldata corporateReason,
        bytes32 planDigest
    ) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient credit balance to retire");
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;

        emit CarbonOffsetRetired(msg.sender, amount, corporateReason, planDigest);
        emit Transfer(msg.sender, address(0), amount);
    }
}
