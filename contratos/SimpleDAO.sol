// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    // Mapeo que guarda la cantidad de acciones (shares) que cada dirección posee
    mapping(address => uint) public shares;
    uint public totalShares;  // Total de acciones en el DAO
    uint public availableFunds;  // Fondos disponibles en el DAO
    
    // Estructura para almacenar las propuestas de gasto
    struct Proposal {
        uint amount;
        address payable recipient;
        uint votes;
        bool executed;
        mapping(address => bool) voters;
    }
    
    Proposal[] public proposals;  // Lista de propuestas

    // Constructor que inicializa el contrato
    constructor() {
        totalShares = 0;
        availableFunds = 0;
    }

    // Función para comprar acciones en el DAO
    function buyShares() public payable {
        require(msg.value > 0, "You must send some Ether to buy shares.");
        shares[msg.sender] += msg.value;
        totalShares += msg.value;
        availableFunds += msg.value;
    }

    // Función para proponer un gasto del DAO
    function proposeSpending(uint amount, address payable recipient) public {
        require(shares[msg.sender] > 0, "Only shareholders can propose spending.");
        require(amount <= availableFunds, "Not enough funds available.");
        
        Proposal storage newProposal = proposals.push();
        newProposal.amount = amount;
        newProposal.recipient = recipient;
        newProposal.votes = 0;
        newProposal.executed = false;
    }

    // Función para votar sobre una propuesta
    function vote(uint proposalId) public {
        require(shares[msg.sender] > 0, "Only shareholders can vote.");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voters[msg.sender], "You have already voted on this proposal.");
        
        proposal.voters[msg.sender] = true;
        proposal.votes += shares[msg.sender];
    }

    // Función para ejecutar una propuesta si ha alcanzado el consenso
    function executeProposal(uint proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed.");
        require(proposal.votes > totalShares / 2, "Not enough votes to execute the proposal.");  // Mayoría simple
        
        proposal.executed = true;
        availableFunds -= proposal.amount;
        proposal.recipient.transfer(proposal.amount);
    }

    // Función para retirar fondos (solo si se es accionista y hay fondos disponibles)
    function withdrawFunds(uint amount) public {
        require(amount <= availableFunds, "Not enough funds available.");
        require(shares[msg.sender] > 0, "Only shareholders can withdraw funds.");
        require(shares[msg.sender] >= amount, "Insufficient shares to withdraw this amount.");

        shares[msg.sender] -= amount;
        totalShares -= amount;
        availableFunds -= amount;
        payable(msg.sender).transfer(amount);
    }
}
