'use strict'

const logger = require("../utils/logger");
const config = require("../config");

exports.handleGetCrumbs = (packet, connection) => {
  const crumbObj = {
    type: packet.params[0],
    crumbs: packet.params[1]
  };

  if (config.debug) {
    logger.incoming(`[Crumbs Received] Successfully parsed ${crumbObj.type} crumbs`);
  }

  connection.crumbs[crumbObj.type] = JSON.parse(crumbObj.crumbs);
  connection.emit(ActionType.ENGINE.GET_CRUMBS, crumbObj);
};


exports.handleGetPlayer = (packet, connection) => {
  const playerObj = {
    player: packet.params[0],
    cause: packet.params[1]
  };

  connection.emit(ActionType.ENGINE.GET_PLAYER, playerObj);
};

exports.handleGetPrompt = (packet, connection) => {
  const promptObj = {
    type: packet.params[0],
    message: packet.params[1]
  };

  connection.emit(ActionType.ENGINE.GET_PROMPT, promptObj);
};
