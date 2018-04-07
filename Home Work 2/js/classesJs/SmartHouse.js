function SmartHouse () {

	this._CDPlayers = [];
	this._TVSets = [];
	this._musicCenters = [];
	this._allDevices = [];
}

SmartHouse.prototype.addCDPlayer  = function() {
	this._CDPlayers[this._CDPlayers.length] = new CDPlayer();
	this._allDevices[this._allDevices.length] = this._CDPlayers[this._CDPlayers.length-1];
	return this._CDPlayers[this._CDPlayers.length-1];
}

SmartHouse.prototype.addTVSet  = function() {
	this._TVSets[this._TVSets.length] = new TVSet();
	this._allDevices[this._allDevices.length] = this._TVSets[this._TVSets.length-1];
	return this._TVSets[this._TVSets.length-1];
}

SmartHouse.prototype.addMusicCenter  = function() {
	this._musicCenters[this._musicCenters.length] = new MusicCenter();
	this._allDevices[this._allDevices.length] = this._musicCenters[this._musicCenters.length-1];
	return this._musicCenters[this._musicCenters.length-1];
}

SmartHouse.prototype.getCDPlayers  = function() {
	return this._CDPlayers;
}

SmartHouse.prototype.TVSets  = function() {
	return this._TVSets;
}

SmartHouse.prototype.musicCenters  = function() {
	return this._musicCenters;
}

SmartHouse.prototype.getDevicesByName  = function(deviceName) {
	if(deviceName.toUpperCase() == "CDPlayers".toUpperCase())
		return this["_CDPlayers"];
	if(deviceName.toUpperCase() == "TVSets".toUpperCase())
		return this["_TVSets"];
	if(deviceName.toUpperCase() == "musicCenters".toUpperCase())
		return this["_musicCenters"];
}

SmartHouse.prototype.getDevicesByModel  = function(model) {
	var devices = [];
	for( var deviceStore in this )
		for( var device in  this[deviceStore] )
			if(this[deviceStore][device].model == model)
				devices[devices.length] = this[deviceStore][device];
	if(devices.length == 0)
		return false;
	return devices[0];
}

SmartHouse.prototype.deleteDevicesByName  = function(deviceName) {
	if(deviceName.toUpperCase() == "CDPlayers".toUpperCase())
		this["_CDPlayers"] = [];
	if(deviceName.toUpperCase() == "TVSets".toUpperCase())
		this["_TVSets"] = [];
	if(deviceName.toUpperCase() == "musicCenters".toUpperCase())
		this["_musicCenters"] = [];
}

SmartHouse.prototype.deleteDevicesByModel  = function(model) {
	for( var deviceStore in this ){
		for( var i=0; i < this[deviceStore].length; i++){
			if( this[deviceStore][i].model == model ){
				this[deviceStore][i] = undefined;
			}
		}
		for( var i=0; i < this[deviceStore].length; i++){
			if( this[deviceStore][i] == undefined){
				for( var k=i+1; k < this[deviceStore].length; k++){
					if( this[deviceStore][k] != undefined){
						this[deviceStore][i] = this[deviceStore][k];
						this[deviceStore][k] = undefined;
						break;
					}
				}
			}
		}
		for( var i=0; i<this[deviceStore].length; i++){
			if(this[deviceStore][i] == undefined){
				this[deviceStore].length = i;
			}
		}
	}
}

			
SmartHouse.prototype.deleteLastAddedDevice  = function(deviceName) {
	if(this._allDevices[this._allDevices.length - 1]._device == "TVSet"){
		this._allDevices.length --;
		this._TVSets.length --;
		return;
	}
	if(this._allDevices[this._allDevices.length - 1]._device == "CDPlayer"){
		this._allDevices.length --;
		this._CDPlayers.length --;
		return;
	}
	if(this._allDevices[this._allDevices.length - 1]._device == "MusicCenter"){
		this._allDevices.length --;
		this._musicCenters.length --;
		return;
	}	
}