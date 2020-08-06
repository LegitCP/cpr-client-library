const Penguin = require('../src/networking/penguin');
const logger = require('../src/utils/logger');

// Credits: https://github.com/wesbos/waait
const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

const addFreeItems = async (penguin, delay, freeOnly) => {
  logger.info('Adding all free items...');

  const { item } = penguin.connection.crumbs;
  const items = freeOnly ? Object.entries(item).filter(([id, crumb]) => crumb.cost !== 0) : Object.entries(item);

  for (const [id, crumb] of items) {
    logger.info(`Attempting to add item ${crumb.english} with cost of ${crumb.cost}...`);
    penguin.buyItem(parseInt(id));
    await wait(delay);
  }

  logger.info('Successfully added all items to your CPR HTML5 account. Enjoy!');
  process.exit();
};

exports.run = async (obj) => {
  logger.info('Initializing item adder...');
  const myPenguin = new Penguin(obj.username, obj.password);
  await myPenguin.login({ server: 'blizzard' });
  setupCallbacks(myPenguin, obj.delay);
  myPenguin.joinRoom(100, 490, 1020);
};

const setupCallbacks = async (myPenguin, obj) => {
  myPenguin.connection.once(ActionType.NAVIGATION.JOIN_ROOM, async (packet) => {
    const { roomId, x, y } = packet;
    const room = myPenguin.connection.getCrumb('room');

    logger.info(`Successfully joined room '${room[roomId].english}' at coords '${x}:${y}'`);

    logger.info('Starting item adder...');
    await addFreeItems(myPenguin, obj.delay, obj.freeOnly);
  });

  myPenguin.connection.on(ActionType.INVENTORY.BUY_INVENTORY, (packet) => {
    const { itemId } = packet;
    const item = myPenguin.connection.getCrumb('item');

    logger.info(`Successfully purchased item '${item[itemId].english}' with cost of ${item[itemId].cost}`);
  });

  myPenguin.connection.on(ActionType.ENGINE.GET_PROMPT, (packet) => {
    const { message } = packet;

    logger.error(`An error occurred while attempting to purchase the previous item: ${message}`);
  });
};
