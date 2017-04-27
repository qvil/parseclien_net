var jf = require('jsonfile');
const config = require("./config");

exports.UserInfo = class UserInfo {
  constructor(jsonFile = 'config.json'){
    this._jsonFile = jsonFile;
    // jsonfile.readFileSync(file);
  }

  readUserInfo(userId){
    var obj = {};
    try{
      obj = jf.readFileSync(this._jsonFile);
    }
    catch(exception){
      console.log('[KangLOG] Cannot read the file');
      return undefined;
    }
    if (userId == undefined){
      return obj;
    }
    return obj[userId];
  }

  readCommonInfo(){
    var readData = {};
    try{
      readData = jf.readFileSync(this._jsonFile);
    }
    catch(exception){
      console.log('[KangLOG] Cannot read the file');      
    }

    if (readData["common"] == undefined){
      readData["common"] = config.commonObj;
      console.log('[KangLOG] write common data : ' + JSON.stringify(readData));
      jf.writeFileSync(this._jsonFile, readData);      
    }
    return readData["common"];
  }

  writeUserInfo(userId, obj){
    var readData = {};    
    try{
      readData = jf.readFileSync(this._jsonFile);
    }
    catch(exception){
      console.log('[KangLOG] Cannot read the file');
    }
    readData[userId] = obj;    
    jf.writeFileSync(this._jsonFile, readData);    
  }

  getRegisteredChatIDs(){
    var readData = jf.readFileSync(this._jsonFile);
    var keyArray = Object.keys(readData);

    return keyArray.filter((chatId) => chatId != "common");
  }
}