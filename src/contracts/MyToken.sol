pragma solidity ^0.5.0;

contract MyToken {
    string  public name = "My coin";
    string  public symbol = "CEM";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    address[] public partners;
    mapping(address => uint) public partnerBalance;     // store partner points balance
    mapping(address => bool) public isRegistered;       // control if partner is already registered
    mapping(address => uint256) public balanceOf;       // control member balance
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    // define member total supply
    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;

    }

    // Member can reedem points:
    // Update member/partners with points used
    function reedem(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;


        // update partners balance (reconciliation logic goes here...)
        for (uint i=0; i<partners.length; i++) {

            address recipient = partners[i];
            uint balance = partnerBalance[recipient];
            if(balance > 0) {
                partnerBalance[recipient] += _value;
            }
        }

        // update member balance
        emit Transfer(msg.sender, _to, _value);
    }

    // Member should approve the transaction
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Transfer funds from / to
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    // register a new partner
    function registerPartner(address _to, uint256 _value) public returns (bool success) {

        // partner balance control
        partnerBalance[_to] = partnerBalance[_to] + _value;

        // Add partner to partners array
        if(!isRegistered[_to]) {
            partners.push(_to);
        }

        // Update staking status
        isRegistered[_to] = true;

        return true;
    }

    // Member earn points
    function issueTokens(address _to, uint256 _value, address partnerId) public returns (bool success) {

        // update partner balance
        partnerBalance[partnerId] -= _value;

        // update member balance with new points (tokens)
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
