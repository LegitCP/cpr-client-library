'use strict'

const io = require('socket.io-client');
const Emitter = require('component-emitter');

const buddyEvents = require('../events/buddyEvents');
const engineEvents = require('../events/engineEvents');
const gameEvents = require('../events/gameEvents');
const ignoreEvents = require('../events/ignoreEvents');
const inventoryEvents = require('../events/inventoryEvents');
const loginEvents = require('../events/loginEvents');
const navigationEvents = require('../events/navigationEvents');
const playerEvents = require('../events/playerEvents');
const worldEvents = require('../events/worldEvents');

module.exports = class Connection {
  constructor(ip, port) {
    Emitter(Connection.prototype);

    this.ip = ip;
    this.port = port;

    this.socket = io(`${this.ip}:${this.port}`, {
      transports: ['websocket'],
      autoConnect: false
    });

    this.socket.on('connect', () => {
      logger.info(`Connected to CPR ${port === 7070 ? 'login' : 'game'} server.`);
    });
    this.socket.on('disconnect', () => {
      logger.error(`Disconnected from CPR ${port === 7070 ? 'login' : 'game'} server.`);
    });
    this.socket.on('p', (data) => {
      const dataAsJson = JSON.parse(data);
      this.handlePacket(dataAsJson);
    });

    this.isLoggedIn = false;
    this.crumbs = { servers: null, item: null, room: null, game: null };

    this.listeners = {
      'login': {
        'u': loginEvents.handleUserLogin
      },
      'world': {
        'auth': worldEvents.handleWorldAuth
      },
      'engine': {
        'get_crumbs': engineEvents.handleGetCrumbs,
        'get_player': engineEvents.handleGetPlayer,
        'prompt': engineEvents.handleGetPrompt
      },
      'ignore': {
        'get_ignored': ignoreEvents.handleGetIgnored
      },
      'navigation': {
        'add_player': navigationEvents.handleAddPlayer,
        'join_room': navigationEvents.handleJoinRoom,
        'remove_player': navigationEvents.handleRemovePlayer
      },
      'player': {
        'action': playerEvents.handleAction,
        'emote': playerEvents.handleEmote,
        'message': playerEvents.handleMessage,
        'move': playerEvents.handleMove,
        'update_wearing': playerEvents.handleUpdateWearing
      },
      'buddy': {
        'add_buddy': buddyEvents.handleAddBuddy,
        'find_buddy': buddyEvents.handleFindBuddy,
        'get_buddies': buddyEvents.handleGetBuddies,
        'notify_online': buddyEvents.handleNotifyOnline,
        'notify_offline': buddyEvents.handleNotifyOffline,
        'remove_buddy': buddyEvents.handleRemoveBuddy,
        'request_buddy': buddyEvents.handleRequestBuddy,
        'search': buddyEvents.handleSearch,
      },
      'inventory': {
        'buy_inventory': inventoryEvents.handleBuyInventory,
        'get_inventory': inventoryEvents.handleGetInventory
      },
      'game': {
        'over': gameEvents.handleGameOver
      }
    };
  }

  handlePacket(packetObj) {
    const [action, type] = packetObj.action.split(':');
    (config.debug && type !== 'get_crumbs') ?
      logger.incoming(`[Packet Received] ${JSON.stringify(packetObj)}`) : null;
    if (!this.listeners[action] || !this.listeners[action][type]) {
      logger.error(`Failed to parse packet of type '${action}:${type}'`);
      return;
    }
    this.listeners[action][type](packetObj, this);
  }

  sendPacket(action, params = []) {
    const packet = {action, params};
    config.debug ? logger.outgoing(`[Packet Sent] ${JSON.stringify(packet)}`) : null;
    this.socket.emit('p', packet);
  }

  getCrumb(type) {
    if (!this.isLoggedIn) {
      logger.error('Cannot get crumbs before logging into the server. Please call login method to continue.');
    } else if (!this.crumbs[type] || this.crumbs[type] === null) {
      const joined = Object.keys(this.crumbs).join(', ');
      logger.error(`Crumbs of type '${type}' could not be found. Please try: ${joined}.`);
    } else {
      return this.crumbs[type];
    }
  }
}
