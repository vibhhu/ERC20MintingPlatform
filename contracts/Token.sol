// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// This will import all the variables and methods of contracts mentioned after <is<
// So we can accessing and override them according to our needs.
contract HKPtoken is ERC20, ERC20Burnable, Ownable  {

    // public keyword here creates a getter function which returns the value or the variable.

    // We can access these variable by simply writing variable name <tokenPrice<

    // But to access these vairables from inherited contracts, we need to call them <tokenPrice()<.
    uint public tokenPrice;
    uint public maxSupply;


    constructor() ERC20("HKPtoken", "HKP") {
      // In solidity, quantity of 1 means 1 * 10^18
      // and 1 Ether means, 1 * 10^18 wei

      // Setting token price to 0.2 ether
      tokenPrice = 2000000000000000;

      // Max supply is 150 tokens
      maxSupply = 150000000000000000000;
    }

    function mint(uint amount) public payable{
      // totalSupply means total number of Tokens already minted.

      // checking if totalSupply + requested amount is <= max allowed Supply(maxSupply)
        require(
            totalSupply() + amount <= maxSupply,
            "Exceeding max supply"
        );

      // checking if ether sent by minter is in accordence with tokenPrice and amount.
        require(
            msg.value * 10 ** decimals() / amount >= tokenPrice,
            "Pay Ether according to Token Price"
        );

      // This _mint() function is provided by OpenZeppelin ERC20 contract. There are generic codes that every ERC20 contract must have. OpenZeppelin helps us by removing the need to writing generic code and focus on requirement part.
        _mint(msg.sender, amount);
    }

    function withdrawEther() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // We will call this function to get these information to show in front-end application.
    // We are returning multiple things from single function here so that we won<t have to call each getter function one by one.
    function returnState() public view returns(uint _myBalance, uint _maxSupply, uint _totalSupply, uint _tokenPrice ){
        return (balanceOf(msg.sender), maxSupply, totalSupply(), tokenPrice);
    }

    // Notice how we are calling <totalSupply()< to access.This is because this variable is inherited from ERC20 contract by OpenZeppelin.
}
