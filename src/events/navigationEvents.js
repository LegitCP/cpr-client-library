'use strict'

exports.handleJoinRoom = (packet, connection) => {
  const roomObj = {
    roomId: parseInt(packet.params[0]),
    x: parseInt(packet.params[1]),
    y: parseInt(packet.params[2])
  };

  connection.emit(ActionType.NAVIGATION.JOIN_ROOM, roomObj);
};

exports.handleAddPlayer = (packet, connection) => {
  const playerObj = {
    x: parseInt(packet.params[0]),
    y: parseInt(packet.params[1]),
    playerId: parseInt(packet.params[2]),
    username: packet.params[3],
    penguinString: packet.params[4]
  };

  connection.emit(ActionType.NAVIGATION.ADD_PLAYER, playerObj);
};

exports.handleRemovePlayer = (packet, connection) => {
  const playerObj = {
    playerId: parseInt(packet.params[0])
  };

  connection.emit(ActionType.NAVIGATION.REMOVE_PLAYER, playerObj);
};
