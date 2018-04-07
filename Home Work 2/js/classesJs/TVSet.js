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
		this.render();
	} );	
}

TVSet.prototype.decreaseVolume = function() {
	this.doIfDeviceOn( function() {
		if(this._volume >= 5)
			this._volume -= 5;
		this.render();
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
		this.render();
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
		this.render();
	} );
}

TVSet.prototype.decreaseChannel = function() {
	this.doIfDeviceOn( function() {
		this._currentChannel--;
		this.render();
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
		this.render();
	} );
}

TVSet.prototype.getCurrentChannel = function() {
	return this._currentChannel;
}

TVSet.prototype.render = function() {

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

	var tvSet = document.createElement("div");
	tvSet.className = "tvSet";
	tvSet.addEventListener("mouseover", function() {
		hidenStatus.className = "hidenStatusHover";
	});
	tvSet.addEventListener("mouseout", function() {
	    hidenStatus.className = "hidenStatus";
	});
	wrapper.appendChild(tvSet);

	var hidenStatus = document.createElement("div");
	hidenStatus.className = "hidenStatus";
	wrapper.appendChild(hidenStatus);
	this.renderHidenStatus(hidenStatus);

	var tvLoudSpeaker = document.createElement("div");
	tvLoudSpeaker.className = "tvLoudSpeaker";
	tvSet.appendChild(tvLoudSpeaker);

	var tvCenterPanel = document.createElement("div");
	tvCenterPanel.className = "tvCenterPanel";
	tvSet.appendChild(tvCenterPanel);

	var tvDisplay = document.createElement("div");
	if(this.getState()){
		tvDisplay.className = "tvDisplayOn";
	}
	else{
		tvDisplay.className = "tvDisplay";
	}
	
	tvCenterPanel.appendChild(tvDisplay);

	var tvControlPanel = document.createElement("div");
	tvControlPanel.className = "tvControlPanel";
	tvCenterPanel.appendChild(tvControlPanel);

	var tvModel = document.createElement("div");
	tvModel.className = "tvModel";
	tvModel.innerText = this.getModel();
	tvModel.addEventListener("click", function() {
	    context.setModel(prompt());
	});
	tvControlPanel.appendChild(tvModel);

	var tvControlWrapper = document.createElement("div");
	tvControlWrapper.className = "tvControlWrapper";
	tvControlPanel.appendChild(tvControlWrapper);


	var tvControlBtnsArr = [];
	for( var i=0; i<8; i++ ){
		tvControlBtnsArr[i] = document.createElement("button");
		tvControlBtnsArr[i].type = "button";
		tvControlBtnsArr[i].className = "tvControlBtns";
			tvControlWrapper.appendChild(tvControlBtnsArr[i]);
		}
	
		tvControlBtnsArr[0].innerText = "On";
		tvControlBtnsArr[0].addEventListener("click", function() {
	        context.on();
	    });
		tvControlBtnsArr[1].innerText = "Off";
		tvControlBtnsArr[1].addEventListener("click", function() {
	        context.off();
	    });
		tvControlBtnsArr[2].innerText = "Increase volume";
		tvControlBtnsArr[2].addEventListener("click", function() {
	        context.increaseVolume();
	    });
		tvControlBtnsArr[3].innerText = "Decrease volume";
		tvControlBtnsArr[3].addEventListener("click", function() {
	        context.decreaseVolume();
	    });
		tvControlBtnsArr[4].innerText = "Set volume";
		tvControlBtnsArr[4].addEventListener("click", function() {
	        context.setVolume(prompt());
	    });
		tvControlBtnsArr[5].innerText = "Increase channel";	
		tvControlBtnsArr[5].addEventListener("click", function() {
	        context.increaseChannel();
	    });	
		tvControlBtnsArr[6].innerText = "Decrease channel";
		tvControlBtnsArr[6].addEventListener("click", function() {
	        context.decreaseChannel();
	    });	
		tvControlBtnsArr[7].innerText = "Set channel";
		tvControlBtnsArr[7].addEventListener("click", function() {
		    context.setCurrentChannel(prompt());
		});	


		tvSet.appendChild(tvLoudSpeaker.cloneNode());
}

TVSet.prototype.renderHidenStatus = function(hidenStatus) {
	var tempArr = ["getState" , "getModel", "getVolume", "getPlayState", "getCover", "getCD", "getCurrentSong", "getMemory", "getUSBState", "getFrequency", "getMod", "getCurrentChannel"];
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