function CDPlayer () {	// Device extends
	Player.call(this);	
	this._device = "CDPlayer";
	this._cover = true; // cover = TRUE means cover IS DOWN. cover = FALSE means cover IS UP
	this._CD = false; // CD = FALSE means NO CD INSIDE. CD = TRUE means CD INSIDE
	this._currentSong = 1;
	this._memory = 30;  // cd player memory. measured in the number of songs
	this._USBInOut = {};
	this._USBState = false; // state = FALSE means NO CONNECTIONS in this time. state = TRUE means CONNECTION
}

CDPlayer.prototype = Object.create(Player.prototype);
CDPlayer.prototype.constructor = CDPlayer;

CDPlayer.prototype.coverUp = function() {
	if(this._playState == false){
		this._cover = false;
		render.call(this);
	}
	else {
		console.dir("Can't open the player cover. Player is on \"play\"")
	}		
}

CDPlayer.prototype.coverDown = function() {
	this._cover = true;
	render.call(this);
}

CDPlayer.prototype.isCoverDown = function() {
	return this._cover;
}

CDPlayer.prototype.getCover = function() {
	return this._cover;
}

CDPlayer.prototype.insertCD = function() {
	if(!this.isCoverDown()){
		this._CD = true;
		render.call(this);
	}
	else{
		Render.viewMessage("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
	}
}

CDPlayer.prototype.removeCD = function() {
	if(!this.isCoverDown()){
		this._CD = false;
		render.call(this);
	}
	else{
		Render.viewMessage("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
	}
}

CDPlayer.prototype.getCD = function() {
	return this._CD;
}

CDPlayer.prototype.isReadyToPlay = function() {
	if(this.isCoverDown() && this._CD)
		return true;
	return false;
}

CDPlayer.prototype.play = function() {
	if( this.isReadyToPlay() ) {
			Player.prototype.play.call(this);
	}
	else {
		Render.viewMessage("Can't play. Please, check CD, cover, or power of device")
	}
}

CDPlayer.prototype.nextSong = function() {
	this.doIfDeviceOn( function() {
		if( this._currentSong > this._memory ){
			this._currentSong = 1;
		}
		this._currentSong++;
		render.call(this);
	} );
}

CDPlayer.prototype.previousSong = function() {
	if( this._currentSong > 1 ){
		this.doIfDeviceOn( function() { 
			this._currentSong--;
			render.call(this);
		} );
	}
}

CDPlayer.prototype.setCurrentSong = function(song) {
	var parse = parseInt(song, 10);
	if( !isNaN(parse) )
		if( parse > 1 && parse <= this.getMemory()){
			this.doIfDeviceOn( function() { this._currentSong = parse; } );
			render.call(this);
		}
	else {
		Render.viewMessage("Check device Power/mod/CD presence");
	}
}

CDPlayer.prototype.getCurrentSong = function() {
	return this._currentSong;
}

CDPlayer.prototype.showCurrentSong = function() {
	console.log(this._currentSong);
}

CDPlayer.prototype.getMemory = function() {
	return this._memory;
}

CDPlayer.prototype.getUSBState = function() {
	return this._USBState;
}

