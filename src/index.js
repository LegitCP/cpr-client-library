'use strict'

const logger = require('./utils/logger');
const config = require('./config');
const actionType = require('./enums/actionType');
const CryptoUtils = require('./utils/cryptoUtils');

global.logger = logger;
global.config = config;
global.ActionType = actionType;
global.cryptoUtils = new CryptoUtils();

console.log("Welcome to CPR Client Library");

// If you want, replace example with your own script for now. NPM module will be coming soon!
const ItemAdder = require('../scripts/itemAdder');

const { username, password, delay, freeOnly } = config.scripts.itemAdder;
ItemAdder.run({ username, password, delay, freeOnly });
