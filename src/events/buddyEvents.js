'use strict'

exports.handleGetBuddies = (packet, connection) => {
  const buddyObj = {
    buddyList: packet.params[0]
  };

  connection.emit(ActionType.BUDDY.GET_BUDDIES, buddyObj);
};

exports.handleAddBuddy = (packet, connection) => {
  const buddyObj = {
    newBuddy: {
      id: parseInt(packet.params[0]),
      swid: packet.params[1],
      unapprovedName: packet.params[2],
      isMascot: packet.params[3]
    }
  };

  connection.emit(ActionType.BUDDY.ADD_BUDDY, buddyObj);
};

exports.handleRemoveBuddy = (packet, connection) => {
  const buddyObj = {
    removedBuddy: {
      id: parseInt(packet.params[0])
    }
  };

  connection.emit(ActionType.BUDDY.REMOVE_BUDDY, buddyObj);
};

exports.handleRequestBuddy = (packet, connection) => {
  const buddyObj = {
    requestedBuddy: {
      id: parseInt(packet.params[0]),
      swid: packet.params[1],
      unapprovedName: packet.params[2]
    }
  };

  connection.emit(ActionType.BUDDY.REQUEST_BUDDY, buddyObj);
};

exports.handleFindBuddy = (packet, connection) => {
  const buddyObj = {
    foundBuddy: {
      unapprovedName: packet.params[0],
      roomName: packet.params[1]
    }
  };

  connection.emit(ActionType.BUDDY.FIND_BUDDY, buddyObj);
};

exports.handleNotifyOnline = (packet, connection) => {
  const buddyObj = {
    buddyId: parseInt(packet.params[0])
  };

  connection.emit(ActionType.BUDDY.NOTIFY_ONLINE, buddyObj);
};

exports.handleNotifyOffline = (packet, connection) => {
  const buddyObj = {
    buddyId: parseInt(packet.params[0])
  };

  connection.emit(ActionType.BUDDY.NOTIFY_OFFLINE, buddyObj);
};

exports.handleSearch = (packet, connection) => {
  const buddyObj = {
    foundPlayers: packet.params[0]
  };

  connection.emit(ActionType.BUDDY.SEARCH, buddyObj);
};

