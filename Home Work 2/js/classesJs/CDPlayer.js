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
		this.render();
	}
	else {
		console.dir("Can't open the player cover. Player is on \"play\"")
	}		
}

CDPlayer.prototype.coverDown = function() {
	this._cover = true;
	this.render();
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
		this.render();
	}
	else{
		console.log("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
	}
}

CDPlayer.prototype.removeCD = function() {
	if(!this.isCoverDown()){
		this._CD = false;
		this.render();
	}
	else{
		console.log("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
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
		console.log("Can't play. Please, check CD, cover, or power of device")
	}
}

CDPlayer.prototype.nextSong = function() {
	this.doIfDeviceOn( function() {
		if( this._currentSong > this._memory ){
			this._currentSong = 1;
		}
		this._currentSong++;
		this.render();
	} );
}

CDPlayer.prototype.previousSong = function() {
	if( this._currentSong > 1 ){
		this.doIfDeviceOn( function() { 
			this._currentSong--;
			this.render(); 
		} );
	}
}

CDPlayer.prototype.setCurrentSong = function(song) {
	var parse = parseInt(song, 10);
	if( !isNaN(parse) )
		if( parse > 1 && parse <= this.getMemory()){
			this.doIfDeviceOn( function() { this._currentSong = parse; } );
			this.render();
		}
	else {
		console.dir("Check device Power/mod/CD presence");
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
CDPlayer.prototype.render = function() {
	
	var context = this;

	this._rootElem = document.getElementById("root");
	var wrapper = document.createElement("div");

	if(!this._wrapper){
		this._wrapper = wrapper;
		wrapper.className = "wrapper";
		this._rootElem.appendChild(wrapper);
	}
	else {
		this._wrapper.innerHTML = "";
		wrapper = document.createElement("div");
		wrapper = this._wrapper;
		wrapper.className = "wrapper";
	}

	var cdPlayer = document.createElement("div");
	cdPlayer.className = "CDPlayer";
	cdPlayer.addEventListener("mouseover", () => {
		hidenStatus.className = "hidenStatusHover";
	});
	cdPlayer.addEventListener("mouseout", () => {
	    hidenStatus.className = "hidenStatus";
	});
	wrapper.appendChild(cdPlayer);	

	var controlCenter = document.createElement("div");
	controlCenter.className = "controlCenter";
	cdPlayer.appendChild(controlCenter);
	var cdDriver = document.createElement("div");

	if( this.getCover() ){
		cdDriver.className = "cdDriver";
	}
	else {
		cdDriver.className = "cdDriverOpen";
	}
	cdDriver.innerText = "CD Driver";
	controlCenter.appendChild(cdDriver);			// Top Music Center

	var cdModel = document.createElement("div");
	cdModel.className = "cdModel";
	cdModel.innerText = this.getModel();
	cdModel.addEventListener("click", function() {
	    context.setModel(prompt());
	});
	controlCenter.appendChild(cdModel);

	var leftSideWrap = document.createElement("div");
	leftSideWrap.className = "leftSideWrap";
	controlCenter.appendChild(leftSideWrap);
	var musicCenterState = document.createElement("div");
	if( this.getState() ){
		musicCenterState.className = "musicCenterStateOn";
	}
		else {
			musicCenterState.className = "musicCenterStateOff";
		}
	leftSideWrap.appendChild(musicCenterState);		// Music Center State


	let leftControlBtnsArr = [];
	for( let i=0; i<6; i++ ){
		leftControlBtnsArr[i] = document.createElement("button");
		leftControlBtnsArr[i].type = "button";
		leftControlBtnsArr[i].className = "controlBtns";
		leftSideWrap.appendChild(leftControlBtnsArr[i]);
	}
	leftControlBtnsArr[0].innerText = "On";
	leftControlBtnsArr[0].addEventListener("click", function() {
		context.on();
	});
	leftControlBtnsArr[1].innerText = "Off";
	leftControlBtnsArr[1].addEventListener("click", function() {
	    context.off();
	});
	leftControlBtnsArr[2].innerText = "Play";
	leftControlBtnsArr[2].addEventListener("click", function() {
	    context.play();
	});
	leftControlBtnsArr[3].innerText = "Stop";
	leftControlBtnsArr[3].addEventListener("click", function() {
	    context.stop();
	});
	leftControlBtnsArr[4].innerText = "Volume +";
	leftControlBtnsArr[4].addEventListener("click", function() {
	    context.increaseVolume();
	});
	leftControlBtnsArr[5].innerText = "Volume -";
	leftControlBtnsArr[5].addEventListener("click", function() {
	    context.decreaseVolume();
	});

	var usbWrapper = document.createElement("div");
	usbWrapper.className = "USBWrapper";
	leftSideWrap.appendChild(usbWrapper);			
	var newElem3 = document.createElement("div");	
	newElem3.innerText = "USB";
	usbWrapper.appendChild(newElem3);
	var usb = document.createElement("div");
	usb.className = "USB";
	usbWrapper.appendChild(usb);					// USBWrapper


	var rightCenterControl = document.createElement("div");
	rightCenterControl.className = "rightCenterControl"
	controlCenter.appendChild(rightCenterControl);

	var rightControlBtnsArr = [];
	for( var i=0; i<7; i++ ){
		rightControlBtnsArr[i] = document.createElement("button");
		rightControlBtnsArr[i].type = "button";
		rightControlBtnsArr[i].className = "controlBtns";
		rightCenterControl.appendChild(rightControlBtnsArr[i]);
	}
	rightControlBtnsArr[0].innerText = "Open CD Driver";
	rightControlBtnsArr[0].addEventListener("click", function() {
	    context.coverUp();
	});
	rightControlBtnsArr[1].innerText = "Close CD Driver";
	rightControlBtnsArr[1].addEventListener("click", function() {
	    context.coverDown();
	});
	rightControlBtnsArr[2].innerText = "InsertCD";
	rightControlBtnsArr[2].addEventListener("click", function() {
	    context.insertCD();
	});
	rightControlBtnsArr[3].innerText = "RemoveCD";
	rightControlBtnsArr[3].addEventListener("click", function() {
	    context.removeCD();
	});
	rightControlBtnsArr[4].innerText = "Next song";
	rightControlBtnsArr[4].addEventListener("click", function() {
	    context.nextSong();
	});	
	rightControlBtnsArr[5].innerText = "Previous song";
	rightControlBtnsArr[5].addEventListener("click", function() {
	    context.previousSong();
	});	
	rightControlBtnsArr[6].innerText = "Set song";
	rightControlBtnsArr[6].addEventListener("click", function() {
	    context.setCurrentSong(prompt());
	});	

	let hidenStatus = document.createElement("div");
	hidenStatus.className = "hidenStatus";
	wrapper.appendChild(hidenStatus);
	this.renderHidenStatus(hidenStatus);
}

CDPlayer.prototype.renderHidenStatus = function(hidenStatus) {
	var tempArr = ["getState" , "getModel", "getVolume", "getPlayState", "getCover", "getCD", "getCurrentSong", "getMemory", "getUSBState", "getFrequency", "getMod"];
	var property = "";
	for(var i=0; i<tempArr.length; i++){
		if(this[tempArr[i]] != undefined){

			for(var j=3; j < tempArr[i].length; j++){
				property += tempArr[i][j];
			}

			var temp = document.createElement("div");
			temp.innerText = property + ":" + this[tempArr[i]]();
			hidenStatus.appendChild(temp);
			property = "";
		}
	}
}