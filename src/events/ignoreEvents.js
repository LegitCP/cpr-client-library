'use strict'

exports.handleGetIgnored = (packet, connection) => {
  const ignoredObj = {
    ignored: packet.params[0]
  };

  connection.emit(ActionType.IGNORE.GET_IGNORED, ignoredObj);
};
