'use strict'

exports.handleGetInventory = (packet, connection) => {
  const invObj = {
    itemIdList: packet.params[0]
  };

  connection.emit(ActionType.INVENTORY.GET_INVENTORY, invObj);
};

exports.handleBuyInventory = (packet, connection) => {
  const invObj = {
    itemId: parseInt(packet.params[0])
  };

  connection.emit(ActionType.INVENTORY.BUY_INVENTORY, invObj);
};
