'use strict'

exports.handleGameOver = (packet, connection) => {
  const gameObj = {
    coins: {
      total: parseInt(packet.params[0]),
      gained: parseInt(packet.params[1])
    },
    room: {
      spawn: {
        x: parseInt(packet.params[2]),
        y: parseInt(packet.params[3])
      }
    }
  };

  connection.emit(ActionType.GAME.OVER, gameObj);
};
