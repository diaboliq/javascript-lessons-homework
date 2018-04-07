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
			this.render();
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
				this.render();
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
				this.render();
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
			this.render();
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

MusicCenter.prototype.render = function() {

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

	var musicCenter = document.createElement("div");
	musicCenter.className = "musicCenter";
	musicCenter.addEventListener("mouseover", function() {
	    hidenStatus.className = "hidenStatusHover";
	});
	musicCenter.addEventListener("mouseout", function() {
	    hidenStatus.className = "hidenStatus";
	});
	wrapper.appendChild(musicCenter);

	var leftLoudSpeaker = document.createElement("div");
	leftLoudSpeaker.className = "loudSpeaker";
	musicCenter.appendChild(leftLoudSpeaker);
	var model = document.createElement("div");
	model.className = "model";
	model.innerText = this.getModel();
	model.addEventListener("click", function() {
	    context.setModel(prompt());
	});
	leftLoudSpeaker.appendChild(model);
	var speakerCell = document.createElement("div");
	speakerCell.className = "speakerCell";
	leftLoudSpeaker.appendChild(speakerCell);			// Left LoudSpeaker


	var controlCenter = document.createElement("div");
	controlCenter.className = "controlCenter";
	musicCenter.appendChild(controlCenter);
	let cdDriver = document.createElement("div");

	if( this.getCover() ){
		cdDriver.className = "cdDriver";
	}
	else {
		cdDriver.className = "cdDriverOpen";
	}
	cdDriver.innerText = "CD Driver";
	controlCenter.appendChild(cdDriver);			// Top Music Center

	var leftSideWrap = document.createElement("div");
	leftSideWrap.className = "leftSideWrap";
	controlCenter.appendChild(leftSideWrap);
	let musicCenterState = document.createElement("div");
	if( this.getState() ){
		musicCenterState.className = "musicCenterStateOn";
	}
	else {
		musicCenterState.className = "musicCenterStateOff";
	}
	leftSideWrap.appendChild(musicCenterState);		// Music Center State

	var radioBtns = document.createElement("div");
	radioBtns.className = "radioBtns";
	leftSideWrap.appendChild(radioBtns);
	var newElem = document.createElement("div");
	newElem.innerText = "Radio";
	var controlBtns = document.createElement("input");
	controlBtns.addEventListener("click", function() {
	    context.increaseFrequency();
	});


	var leftControlBtnsArr = [];
	for( var i=0; i < 8; i++ ){
		leftControlBtnsArr[i] = document.createElement("button");
		leftControlBtnsArr[i].type = "button";
		leftControlBtnsArr[i].className = "controlBtns";
		leftSideWrap.appendChild(leftControlBtnsArr[i]);
	}
	leftControlBtnsArr[0].innerText = "Radio";
	leftControlBtnsArr[0].addEventListener("click", function() {
	    context.changeMod("radio");
	});
	leftControlBtnsArr[1].innerText = "CD Player";
	leftControlBtnsArr[1].addEventListener("click", function() {
	    context.changeMod("CDPlayer");
	});
	leftControlBtnsArr[2].innerText = "On";
	leftControlBtnsArr[2].addEventListener("click", function() {
		context.on()
	});

	leftControlBtnsArr[3].innerText = "Off";
	leftControlBtnsArr[3].addEventListener("click", function() {
	    context.off();
	});
	leftControlBtnsArr[4].innerText = "Play";
	leftControlBtnsArr[4].addEventListener("click", function() {
	    context.play();
	});
	leftControlBtnsArr[5].innerText = "Stop";
	leftControlBtnsArr[5].addEventListener("click", function() {
	    context.stop();
	});
	leftControlBtnsArr[6].innerText = "Volume +";
	leftControlBtnsArr[6].addEventListener("click", function() {
	    context.increaseVolume();
	});
	leftControlBtnsArr[7].innerText = "Volume -";
	leftControlBtnsArr[7].addEventListener("click", function() {
	    context.decreaseVolume();
	});																// Leftside Control Buttons

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
	for( var i=0; i<10; i++ ){
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
	rightControlBtnsArr[4].innerText = "Frequency +";
	rightControlBtnsArr[4].addEventListener("click", function() {
	    context.increaseFrequency();
	});
	rightControlBtnsArr[5].innerText = "Frequency -";	
	rightControlBtnsArr[5].addEventListener("click", function() {
	    context.decreaseFrequency();
	});	
	rightControlBtnsArr[6].innerText = "Set freq.";
	rightControlBtnsArr[6].addEventListener("click", function() {
	    context.setFrequency(prompt());
	});	
	rightControlBtnsArr[7].innerText = "Next song";
	rightControlBtnsArr[7].addEventListener("click", function() {
	    context.nextSong();
	});	
	rightControlBtnsArr[8].innerText = "Previous song";
	rightControlBtnsArr[8].addEventListener("click", function() {
	    context.previousSong();
	});	
	rightControlBtnsArr[9].innerText = "Set song";
	rightControlBtnsArr[9].addEventListener("click", function() {
	    context.setCurrentSong(prompt());
	});															// RightSide Control Buttons
	var rightLoudSpeaker = leftLoudSpeaker.cloneNode(true);
	rightLoudSpeaker.children[0].addEventListener("click", function() {
	    context.setModel(prompt());
	});
	musicCenter.appendChild(rightLoudSpeaker);			// Right LoudSpeaker

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