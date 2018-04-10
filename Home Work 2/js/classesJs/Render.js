function Render() {

	Render.prototype.render = function() {
		if(this._device == "CDPlayer"){
			Render.renderCDPlayer.call(this);
		}
		if(this._device == "MusicCenter"){
			Render.renderMusicCenter.call(this);
		}
		if(this._device == "TVSet"){
			Render.renderTVSet.call(this);
		}
	}

	Render.renderCDPlayer = function() {

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
			cdPlayer.addEventListener("mouseover", function() {
				hidenStatus.className = "hidenStatusHover";
			});
			cdPlayer.addEventListener("mouseout", function() {
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
			Render.renderHidenStatus.call(this, hidenStatus);
	}

	Render.renderMusicCenter = function() {

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
		Render.renderHidenStatus.call(this, hidenStatus);
	}

	Render.renderTVSet = function() {


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
		Render.renderHidenStatus.call(this, hidenStatus);

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

	Render.renderHidenStatus = function(hidenStatus) {
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

	Render.viewMessage = function( message ) {

		var messageElem = document.createElement("div");
		messageElem.className = "messageElem";
		messageElem.style.width = "400px";
		messageElem.innerText = message;
		messageElem.style.position = "fixed";
		messageElem.style.fontSize = "30px";
		messageElem.style.left = "300px";
		messageElem.style.top = "300px";
		messageElem.style.backgroundColor = "#ccc";

		var promise = new Promise( function( resolve, reject ) {
			var rootElem = document.getElementById("root");
			rootElem.appendChild(messageElem);

			setTimeout( function(){
				resolve(rootElem);
			}, 2000 );
		} );

		promise.then( function(){
			rootElem.removeChild(messageElem);
		}, function() { } 
		);
	}
}