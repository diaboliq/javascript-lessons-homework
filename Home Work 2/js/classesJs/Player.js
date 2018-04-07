function Player () {	// Device extends
	Device.call(this);	
	this._volume = 5;
	this._playState = false;// state = FALSE means NO CONNECTIONS in this time. state = TRUE means CONNECTION	
}

Player.prototype = Object.create(Device.prototype);
Player.prototype.constructor = Player;

Player.prototype.increaseVolume = function() {
	this.doIfDeviceOn( function(){
		if(this._volume < 100){
			this._volume += 5;
			this.render();
		}
	} );		
}

Player.prototype.decreaseVolume = function() {
	this.doIfDeviceOn( function(){
		if(this._volume >= 5){
			this._volume -= 5;
			this.render();
		}
	} );	
}

Player.prototype.setVolume = function(level) {
	this.doIfDeviceOn( function(){
		if(typeof level != "number"){
			console.log( "must be typeof(volume) == \"number\"" )
			return;
		}
			if(level > 100){
			console.log( "must be 0 < volume >= 100" );
			return;
		}
			this._volume = level;
			this.render();
	} );
}

Player.prototype.getVolume = function() {
	return this._volume;
}

Player.prototype.showVolume = function() {
	console.log(this._volume);
}

Player.prototype.play = function() {
	this.doIfDeviceOn( function() {
		this._playState = true;
		this.render();
	} );
}

Player.prototype.stop = function() {
	this.doIfDeviceOn( function() {
		this._playState = false;
		this.render();
	} );
}

Player.prototype.getPlayState = function() {
	return this._playState;
}
