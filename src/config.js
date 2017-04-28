/*
* Author : Youngki
* Email : yellowgg2@gmail.com
* If you would like to add more url to be watching,
* you have to modify this file expectedly.
*/
const listOfBoards = ["jirum", "park", "iphone", "nas"];

exports.listOfDashBoard = listOfBoards;

exports.dashboard = {
  [listOfBoards[0]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=jirum",
  [listOfBoards[1]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=park",
  [listOfBoards[2]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=cm_iphonien",
  [listOfBoards[3]]: "http://www.clien.net/cs2/bbs/board.php?bo_table=cm_nas",
  main: "http://www.clien.net/"
};

exports.commonObj = {
  [listOfBoards[0]]: 0,
  [listOfBoards[1]]: 0,
  [listOfBoards[2]]: 0,
  [listOfBoards[3]]: 0,
};

// If you have your own bot token, you need to set below variables.
exports.token = '175007468:AAHnFnaribWo1hKEXzZ-CFZF5oYo9vIl8fQ'; // raven bot