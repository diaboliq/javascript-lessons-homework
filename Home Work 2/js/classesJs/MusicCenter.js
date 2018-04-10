function MusicCenter () {	// Device extends
	CDPlayer.call(this);	
	this._device = "MusicCenter";
	this._frequency = 0;
	this._mods = ["radio", "CDPlayer", "USBPlayer"];
	this._mod = this._mods[0];
}

MusicCenter.prototype = Object.create(CDPlayer.prototype);
MusicCenter.prototype.constructor = MusicCenter;

MusicCenter.prototype.nextSong = function() {
	if(this.getMod() == this._mods[1]){
		CDPlayer.prototype.nextSong.call(this);
	}
	else
		console.log("Can't do this. Current mod is " + this.getMod());
}

MusicCenter.prototype.previousSong = function() {
	if(this.getMod() == this._mods[1]){
		CDPlayer.prototype.previousSong.call(this);
	}
	else
		console.log("Can't do this. Current mod is " + this.getMod());
}

MusicCenter.prototype.changeMod = function(mod) {
	this.doIfDeviceOn( function() {
		if( this._mods.some( function(elem) { return (elem == mod);} ) ){
			this._mod = mod;
			render.call(this);
		}
		else 
		console.log("Incorrect value. Must be \"radio\", \"CDPlayer\"");
	});
}

MusicCenter.prototype.getMod = function() {
	return this._mod;
}

MusicCenter.prototype.increaseFrequency = function() {
	if(this.getMod() == this._mods[0])
		this.doIfDeviceOn( function() {
			if(this.getFrequency() < 100){
				this._frequency += 5;
				render.call(this);
			}
		} );
	else
		console.log("Can't do this. Current mod is " + this.getMod());
}

MusicCenter.prototype.decreaseFrequency = function() {
	if(this.getMod() == this._mods[0])
		this.doIfDeviceOn( function() {
			if(this.getFrequency() >= 5){
				this._frequency += 5;
				render.call(this);
			}
		} );
	else
		console.log("Can't do this. Current mod is " + this.getMod());
}

MusicCenter.prototype.setFrequency = function(freq) {
	if(this._mod == this._mods[0])
		this.doIfDeviceOn( function() {
			var parse = parseInt(freq, 10);
			if( isNaN(parse) || parse > 100 || parse < 0 ){
				console.log( "Must be 0 < frequency >= 100" );
				return;
			}
			this._frequency = freq;
			render.call(this);
		} );
	else{
		console.log(`Can't do this. Current mod is ${this._mod}`);
	}
}

MusicCenter.prototype.getFrequency = function() {
	return this._frequency;
}

MusicCenter.prototype.showFrequency = function() {
	console.log(this._frequency);
}