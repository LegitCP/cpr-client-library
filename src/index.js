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

/*
Delay argument is in milliseconds, adjust for however long in between you want to add items!
1000 = 1 second between adding each item

freeOnly -- Set to either 'true' or 'false' depending on if you want to add only free items or all items. Money maker script not ready yet. Coming soon!

NOTE: It is highly recommended you don't run the scirpt too fast. It is likely in the future there will be a rate limit and server-side checks against adding patched items.

August 6th, 2020: All items are available to be added.
*/
ItemAdder.run({ username: 'USERNAME_HERE', password: 'PASSWORD_HERE', delay: 1000, freeOnly: true});
