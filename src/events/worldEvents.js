'use strict'

exports.handleWorldAuth = (packet, connection) => {
  const worldObj = {
    playerId: packet.params[0],
    username: packet.params[1],
    penguinString: packet.params[2]
  };

  const crumbTypes = ['item', 'room', 'game'];
  crumbTypes.forEach(crumb => connection.sendPacket(ActionType.ENGINE.GET_CRUMBS, [crumb]));

  connection.isLoggedIn = true;
  connection.emit(ActionType.WORLD.AUTHENTICATE, worldObj);
};
