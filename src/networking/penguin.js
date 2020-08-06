'use strict'

const Connection = require('./connection');

module.exports = class Penguin {
  constructor(username, password) {
    const { ip, port } = config.servers.login;
    this.connection = new Connection(ip, port);

    this.username = username;
    this.password = password;

    this.currentRoom = {};
  }

  login(object) {
    return new Promise((resolve, reject) => {
      if (this.connection.isLoggedIn) {
        reject(new Error(`${username} has already logged into CPR!`));
        return;
      }

      this.connection.socket.connect();

      this.connection.once(ActionType.USER.LOGIN, (packet) => {
        config.debug ? logger.debug(`Received token ${packet.token}`) : null;
        this.worldToken = packet.token;
      });

      this.connection.socket.once('connect', () => {
        const hashedPassword = cryptoUtils.hashPasswordCP(this.password);
        this.connection.sendPacket(ActionType.USER.LOGIN, [this.username, hashedPassword]);
      });

      this.connection.socket.once('disconnect', () => {
        const serverName = object.server.toLowerCase();
        this.connectToWorld(serverName)
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });
  }

  connectToWorld(serverName) {
    return new Promise((resolve, reject) => {
      const { servers } = this.connection.crumbs;

      if (!servers || !servers[serverName]) {
        const joined = Object.keys(servers).join(', ');
        logger.error(`Could not find server '${serverName}' in crumbs. Please try: ${joined}`);
        return;
      }

      const { host, port } = servers[serverName];

      this.connection = new Connection(`https://${host}`, port);
      this.connection.socket.connect();

      this.connection.once(ActionType.WORLD.AUTHENTICATE, () => {
        this.connection.isLoggedIn ? resolve() : reject(new Error('Failed to login'));
      });

      this.connection.socket.once('connect', () => {
        this.connection.sendPacket(ActionType.WORLD.AUTHENTICATE, [this.worldToken]);
      });
    });
  }

  buddySearch(name) {
    return new Promise(resolve => {
      this.connection.sendPacket(ActionType.BUDDY.SEARCH, [name]);
      this.connection.once(ActionType.BUDDY.SEARCH, (packet) => {
        resolve(packet);
      });
    });
  }

  move(x, y) {
    this.connection.sendPacket(ActionType.PLAYER.MOVE, [x, y]);
  }

  getPlayer(id) {
    // Default the cause to 'buddy_playercard_open' since I haven't tested if the server will kick for sending an invalid cause yet
    const cause = 'buddy_playercard_open';
    return new Promise(resolve => {
      this.connection.sendPacket(ActionType.ENGINE.GET_PLAYER, [id, cause]);
      this.connection.once(ActionType.ENGINE.GET_PLAYER, (packet) => {
        resolve(packet);
      });
    });
  }

  getBuddies() {
    return new Promise(resolve => {
      this.connection.sendPacket(ActionType.BUDDY.GET_BUDDIES);
      this.connection.once(ActionType.BUDDY.GET_BUDDIES, (packet) => {
        resolve(packet);
      });
    });
  }

  requestBuddy(id) {
    this.connection.sendPacket(ActionType.BUDDY.REQUEST_BUDDY, [id]);
  }

  addBuddy(id) {
    this.connection.sendPacket(ActionType.BUDDY.REQUEST_BUDDY, [id]);
  }

  removeBuddy(id) {
    this.connection.sendPacket(ActionType.BUDDY.REMOVE_BUDDY, [id]);
  }

  getIgnored() {
    return new Promise(resolve => {
      this.connection.sendPacket(ActionType.INVENTORY.GET_IGNORED);
      this.connection.once(ActionType.INVENTORY.GET_IGNORED, (packet) => {
        resolve(packet);
      });
    });
  }

  buyItem(id) {
    this.connection.sendPacket(ActionType.INVENTORY.BUY_INVENTORY, [id]);
  }

  joinRoom(id, x, y) {
    //TODO support for string as ID param (parse room crumbs)
    this.connection.sendPacket(ActionType.NAVIGATION.JOIN_ROOM, [id, x, y]);
  }

  sendMessage(message) {
    this.connection.sendPacket(ActionType.PLAYER.MESSAGE, [message]);
  }

  sendEmote(id) {
    this.connection.sendPacket(ActionType.PLAYER.EMOTE, [`e${id}`]);
  }

  getInventory() {
    return new Promise(resolve => {
      this.connection.sendPacket(ActionType.INVENTORY.GET_INVENTORY);
      this.connection.once(ActionType.INVENTORY.GET_INVENTORY, (packet) => {
        resolve(packet);
      });
    });
  }

  updateWearing(itemType, itemId = 0) {
    this.connection.sendPacket(ActionType.PLAYER.UPDATE_WEARING, [itemType, itemId]);
  }

  performAction(type, actionData) {
    //TODO verify action type
    this.connection.sendPacket(ActionType.PLAYER.ACTION, [type, actionData]);
  }

  addCoins(amount) {
    //TODO Verify max amount of coins that client can add before being kicked --- play it safe for now
    if (amount >= 50000) {
      logger.error('You tried to add too many coins. Please try a number below 50,000!');
      return;
    }

    //TODO verify x and y exit spawn coords depending on user's current game room
    this.connection.sendPacket(ActionType.GAME.OVER, [amount, 407, 692]);
  }
}
