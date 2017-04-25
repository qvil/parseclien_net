var ini = require('node-ini');

exports.ReadWriteIni = class ReadWriteIni{
  constructor(iniFile = "./config.ini", encode = "utf-8"){
    this._iniFile = iniFile;
    this._encode = encode;
    this._iniFilePointer = ini.parseSync(iniFile);
  }

  get iniFilePath(){
    return this._iniFile;
  }

  set iniFilePath(path){
    this._iniFile = path;
  }

  get encode(){
    return this._encode;
  }

  set encode(encode){
    this._encode = encode;
  }

  get filePointer(){
    return this._iniFilePointer;
  }
}