'use strict'

module.exports = {
  servers: {
    login: {
      ip: "https://server.cprewritten.net",
      port: 7070
    }
  },
  scripts: {
    itemAdder: {
      /*
      August 6th, 2020: All items are available to be added.
      */

      username: 'USERNAME_HERE',
      password: 'PASSWORD_HERE',

      /*
        Delay argument is in milliseconds, adjust for however long in between you want to add items!
        1000 = 1 second between adding each item

        NOTE: It is highly recommended you don't run the scirpt too fast. It is likely in the future there will be a rate limit and server-side checks against adding patched items.
      */
      delay: 1000,

      /* freeOnly -- Set to either 'true' or 'false' depending on if you want to add only free items or all items. */
      freeOnly: true
    },
    moneyMaker: {
      /* Money maker script not ready yet. Coming soon! */
    },
  },
  debug: false
}
