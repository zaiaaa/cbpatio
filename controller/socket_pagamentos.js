const Socket = require("../model/socket_pagamentos");

class SessionController {
  left(message){
    return Socket.left(message)
  }
  
  onPaymentApproved(message) {
    return Socket.onPaymentApproved(message)
  }
}

module.exports = new SessionController();
