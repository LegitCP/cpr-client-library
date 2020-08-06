'use strict'

module.exports = {
  USER: {
    LOGIN: 'login:u'
  },
  WORLD: {
    AUTHENTICATE: 'world:auth'
  },
  ENGINE: {
    GET_CRUMBS: 'engine:get_crumbs',
    GET_PLAYER: 'engine:get_player',
    PROMPT: 'engine:prompt'
  },
  IGNORE: {
    GET_IGNORED: 'ignore:get_ignored'
  },
  NAVIGATION: {
    ADD_PLAYER: 'navigation:add_player',
    GET_PLAYERS: 'navigation:get_players',
    JOIN_ROOM: 'navigation:join_room',
    REMOVE_PLAYER: 'navigation:remove_player'
  },
  PLAYER: {
    ACTION: 'player:action',
    EMOTE: 'player:emote',
    MESSAGE: 'player:message',
    MOVE: 'player:move',
    UPDATE_WEARING: 'player:update_wearing'
  },
  BUDDY: {
    ADD_BUDDY: 'buddy:add_buddy',
    FIND_BUDDY: 'buddy:find_buddy',
    GET_BUDDIES: 'buddy:get_buddies',
    NOTIFY_ONLINE: 'buddy:notify_online',
    NOTIFY_OFFLINE: 'buddy:notify_offline',
    REMOVE_BUDDY: 'buddy:remove_buddy',
    REQUEST_BUDDY: 'buddy:request_buddy',
    SEARCH: 'buddy:search'
  },
  INVENTORY: {
    BUY_INVENTORY: 'inventory:buy_inventory',
    GET_INVENTORY: 'inventory:get_inventory'
  },
  GAME: {
    OVER: 'game:over'
  }
};
