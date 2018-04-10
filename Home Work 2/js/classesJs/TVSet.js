function TVSet () {	// Device extends
	Device.call(this);	
	this._device = "TVSet";
	this._volume = 5;
	this._currentChannel = 0;
	this._USBInOut = {};
	this._USBState = false;
}

TVSet.prototype = Object.create(Device.prototype);
TVSet.prototype.constructor = TVSet;

TVSet.prototype.connectDevice = function() {
	if( "_USBInOut" in newDevice  && newDevice.getUSBState() == false && this.getUSBState() == false){
		this._USBInOut = newDevice;
		this._USBState = true;
		newDevice._USBState = true;
		return true;
	}
	else {
		console.log("Device can not be connected. Check USB connectivity or USB port is busy")
	}
}

TVSet.prototype.disconnectDevice = function() {
	this._USBInOut._USBState = false;
	this._USBInOut = {};
	this._USBState = false;
}

TVSet.prototype.getUSBInOut = function() {
	return this._USBInOut;
}

TVSet.prototype.getUSBState = function() {
	return this._USBState;
}

TVSet.prototype.increaseVolume = function() {
	this.doIfDeviceOn( function() {
		if(this._volume < 100)
			this._volume += 5;
		render.call(this);
	} );	
}

TVSet.prototype.decreaseVolume = function() {
	this.doIfDeviceOn( function() {
		if(this._volume >= 5)
			this._volume -= 5;
		render.call(this);
	} );	
}

TVSet.prototype.setVolume = function(level) {
	this.doIfDeviceOn( ()=>{
		var parse = parseInt(level, 10);
		if( isNaN(parse) || parse > 100 || parse < 0 ){
			console.log( "must be 0 < volume >= 100" );
			return;
		}
		this._volume = level;
		render.call(this);
	} );
}

TVSet.prototype.getVolume = function() {
		return this._volume;
}

TVSet.prototype.showVolume = function() {
	this.doIfDeviceOn( function() {
		console.dir(this._volume);
	} );
}

TVSet.prototype.increaseChannel = function() {
	this.doIfDeviceOn( function() {
		this._currentChannel++;
		render.call(this);
	} );
}

TVSet.prototype.decreaseChannel = function() {
	this.doIfDeviceOn( function() {
		this._currentChannel--;
		render.call(this);
	} )
}

TVSet.prototype.getCurrentChannel = function() {
		return this._currentChannel;
}

TVSet.prototype.setCurrentChannel = function(channel) {
	this.doIfDeviceOn( function() {
		var parse = parseInt(channel, 10);
		if( isNaN(parse) || parse > 100 || parse < 0 ){
			console.log( "must be 0 < channel >= 100" );
			return;
		}
		this._currentChannel = channel;
		render.call(this);
	} );
}

TVSet.prototype.getCurrentChannel = function() {
	return this._currentChannel;
}