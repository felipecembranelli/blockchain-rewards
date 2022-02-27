pragma solidity ^0.5.0;

contract MyToken {
    string  public name = "My coin";
    string  public symbol = "CEM";
    uint256 public totalSupply = 1000000000000000000000000; // 1 million tokens
    uint8   public decimals = 18;

    // reconciliation control
    address[] public partners;
    mapping(address => uint) public partnerBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

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

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

    function reedem(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        // balanceOf[_to] += _value;
        // emit Transfer(msg.sender, _to, _value);
        // return true;

        //require(_value <= balanceOf[_from]);
        //require(_value <= allowance[_from][msg.sender]);

        // reconciliation logic
        
        //balanceOf[_from] -= _value;
        //allowance[_from][msg.sender] -= _value;

        for (uint i=0; i<partners.length; i++) {

            address recipient = partners[i];
            uint balance = partnerBalance[recipient];
            if(balance > 0) {
                //dappToken.transfer(recipient, balance);
                //balanceOf[recipient] += _value;
                partnerBalance[recipient] += _value;
            }
        }

        emit Transfer(msg.sender, _to, _value);
    }

     function partnersBalance() public returns (uint) {
        address recipient = partners[0];
        uint balance = partnerBalance[recipient];
        return balance;

        // for (uint i=0; i<partners.length; i++) {

        //     address recipient = partners[i];
        //     uint balance = partnerBalance[recipient];
        //     //if(balance > 0) {
        //         //dappToken.transfer(recipient, balance);
        //         //balanceOf[recipient] += _value;
        //         partnerBalance[recipient] += _value;
        //     //}
        // }
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function registerPartner(address _to, uint256 _value) public returns (bool success) {
        //require(balanceOf[msg.sender] >= _value);
        //balanceOf[msg.sender] -= _value;
        //balanceOf[_to] += _value;
        

        //start: reconciliation control
        //Update staking balance
        partnerBalance[_to] = partnerBalance[_to] + _value;

        // Add user to stakers array *only* if they haven't staked already
        if(!hasStaked[_to]) {
            partners.push(_to);
        }

        // Update staking status
        isStaking[_to] = true;
        hasStaked[_to] = true;

        //emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function issueTokens(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    //  function redeem(address _from, address _to, uint256 _value) public returns (bool success) {
    //     require(_value <= balanceOf[_from]);
    //     require(_value <= allowance[_from][msg.sender]);

    //     // reconciliation logic
        
    //     balanceOf[_from] -= _value;
    //     allowance[_from][msg.sender] -= _value;

    //     for (uint i=0; i<partners.length; i++) {

    //         address recipient = partners[i];
    //         uint balance = partnerBalance[recipient];
    //         if(balance > 0) {
    //             //dappToken.transfer(recipient, balance);

    //             balanceOf[recipient] += _value;

    //             emit Transfer(_from, recipient, _value);
    //         }
    //     }

     
    // }

    // // Issuing Tokens
    // function issueTokens() public {
    //     // Only owner can call this function
    //     require(msg.sender == owner, "caller must be the owner");

    //     // Issue tokens to all stakers
    //     for (uint i=0; i<stakers.length; i++) {
    //         address recipient = stakers[i];
    //         uint balance = stakingBalance[recipient];
    //         if(balance > 0) {
    //             dappToken.transfer(recipient, balance);
    //         }
    //     }
    // }

}
