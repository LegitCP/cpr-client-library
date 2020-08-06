'use strict'

exports.handleMove = (packet, connection) => {
  const moveObj = {
    playerId: parseInt(packet.params[0]),
    x: parseInt(packet.params[1]),
    y: parseInt(packet.params[2])
  };

  connection.emit(ActionType.PLAYER.MOVE, moveObj);
};

exports.handleMessage = (packet, connection) => {
  const msgObj = {
    playerId: parseInt(packet.params[0]),
    message: packet.params[1]
  };

  connection.emit(ActionType.PLAYER.MESSAGE, msgObj);
};

exports.handleUpdateWearing = (packet, connection) => {
  const wearingObj = {
    playerId: parseInt(packet.params[0]),
    itemType: packet.params[1],
    itemId: parseInt(packet.params[2])
  };

  connection.emit(ActionType.PLAYER.UPDATE_WEARING, wearingObj);
};

exports.handleAction = (packet, connection) => {
  const actionObj = {
    playerId: parseInt(packet.params[0]),
    type: packet.params[1],
    actionData: packet.params[2],
  };

  connection.emit(ActionType.PLAYER.ACTION, actionObj);
};

exports.handleEmote = (packet, connection) => {
  const emoteObj = {
    playerId: parseInt(packet.params[0]),
    emote: packet.params[1]
  };

  connection.emit(ActionType.PLAYER.EMOTE, emoteObj);
};
