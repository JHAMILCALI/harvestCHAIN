// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WalletFunder {
    address public owner;

    constructor() {
        owner = msg.sender; // Establece al creador del contrato como el propietario
    }

    // Función para enviar Ether a una dirección específica
    function fundWallet(address payable recipient) external payable {
        require(msg.value > 0, "Debe enviar algo de Ether");
        recipient.transfer(msg.value); // Transfiere Ether a la dirección especificada
    }

    // Función para retirar todos los fondos del contrato a la dirección del propietario
    function withdrawAll() external {
        require(msg.sender == owner, "Solo el propietario puede retirar los fondos");
        payable(owner).transfer(address(this).balance); // Transfiere todo el balance al propietario
    }

    // Función para recibir Ether directamente
    receive() external payable {}

    // Función para obtener el balance actual del contrato
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}