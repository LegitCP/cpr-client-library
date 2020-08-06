'use strict'

const ActionType = require('../enums/actionType');

/*
{"action":"login:u","params":[
  id, --- penguinId
  "user", ---- username
  "TOKEN_HERE", --- token (world auth)

  {"id":id,"swid":"{63227f9b-dcc0-fcaf-7317-6284befba3f6}","username":"user","nickname":"nick","moderator":false,"rank":0,"color":0,"head":0,"face":0,"neck":0,"body":0,"hand":0,"feet":0,"photo":0,"pin":0,"isMascot":false,"giftId":0,"coins":0,"minutesPlayed":0,"age":0}, --- penguin string

  {"blizzard":{"english":"Blizzard","host":"server.cprewritten.net","port":"7071","population":0,"id":100,"safe_chat":false,"buddy_online":false},"zipline":{"english":"Zipline","host":"server.cprewritten.net","port":"7072","population":0,"id":101,"safe_chat":false,"buddy_online":false},"abominable":{"english":"Abominable","host":"server.cprewritten.net","port":"7073","population":0,"id":102,"safe_chat":false,"buddy_online":false},"ascent":{"english":"Ascent","host":"server.cprewritten.net","port":"7075","population":0,"id":104,"safe_chat":false,"buddy_online":false}}, --- worlds list

  1596571841056, --- unknown
  8, --- unknown
  "[^A-Za-z!\" ?😂🤣🤡🥺❤️💞💅]+" --- chat regex
*/

exports.handleUserLogin = (packet, connection) => {
  const loginObj = {
    playerId: packet.params[0],
    username: packet.params[1],
    token: packet.params[2],
    penguinString: packet.params[3],
    worldList: packet.params[4]
  };

  connection.crumbs.servers = loginObj.worldList;
  connection.emit(ActionType.USER.LOGIN, loginObj);
};
