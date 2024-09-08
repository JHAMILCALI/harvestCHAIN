// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract MultiSig {
    address[] public propietarios;
    uint public numConfirmacionesRequeridas;

    struct Transaccion {
        address a;
        uint valor;
        bool ejecutada;
    }

    mapping(uint => mapping(address => bool)) esConfirmada;
    Transaccion[] public transacciones;

    event TransaccionEnviada(uint idTransaccion, address remitente, address receptor, uint cantidad);
    event TransaccionConfirmada(uint idTransaccion);
    event TransaccionEjecutada(uint idTransaccion);

    constructor(address[] memory _propietarios, uint _numConfirmacionesRequeridas) {
        require(_propietarios.length > 1, "Se requieren mas de un propietario");
        require(_numConfirmacionesRequeridas > 0 && _numConfirmacionesRequeridas <= _propietarios.length, "El numero de confirmaciones no esta sincronizado con el numero de propietarios");

        for (uint i = 0; i < _propietarios.length; i++) {
            require(_propietarios[i] != address(0), "Propietario no valido");
            propietarios.push(_propietarios[i]);
        }
        numConfirmacionesRequeridas = _numConfirmacionesRequeridas;
    }

    function enviarTransaccion(address _a) public payable {
        require(_a != address(0), "Direccion del receptor no valida");
        require(msg.value > 0, "La cantidad a transferir debe ser mayor a 0");
        uint idTransaccion = transacciones.length;
        transacciones.push(Transaccion({a: _a, valor: msg.value, ejecutada: false}));
        emit TransaccionEnviada(idTransaccion, msg.sender, _a, msg.value);
    }

    function confirmarTransaccion(uint _idTransaccion) public {
        require(_idTransaccion < transacciones.length, "ID de transaccion no valido");
        require(!esConfirmada[_idTransaccion][msg.sender], "La transaccion ya fue confirmada por este propietario");
        esConfirmada[_idTransaccion][msg.sender] = true;
        emit TransaccionConfirmada(_idTransaccion);
        if (esTransaccionConfirmada(_idTransaccion)) {
            ejecutarTransaccion(_idTransaccion);
        }
    }

    function ejecutarTransaccion(uint _idTransaccion) public payable {
        require(_idTransaccion < transacciones.length, "ID de transaccion no valido");
        require(!transacciones[_idTransaccion].ejecutada, "La transaccion ya ha sido ejecutada");
        (bool exito,) = transacciones[_idTransaccion].a.call{value: transacciones[_idTransaccion].valor}("");
        require(exito, "Ejecucion de la transaccion fallida");
        transacciones[_idTransaccion].ejecutada = true;
        emit TransaccionEjecutada(_idTransaccion);
    }

    function esTransaccionConfirmada(uint _idTransaccion) internal view returns (bool) {
        require(_idTransaccion < transacciones.length, "ID de transaccion no valido");
        uint cuentaConfirmaciones;

        for (uint i = 0; i < propietarios.length; i++) {
            if (esConfirmada[_idTransaccion][propietarios[i]]) {
                cuentaConfirmaciones++;
            }
        }
        return cuentaConfirmaciones >= numConfirmacionesRequeridas;
    }
}
