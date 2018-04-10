	class Render {

		render() {
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

		static renderCDPlayer() {

			this._rootElem = document.getElementById("root");
			let wrapper = document.createElement("div");

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


			let cdPlayer = document.createElement("div");
			cdPlayer.className = "CDPlayer";
			cdPlayer.addEventListener("mouseover", () => {
		        hidenStatus.className = "hidenStatusHover";
		    });
		    cdPlayer.addEventListener("mouseout", () => {
		        hidenStatus.className = "hidenStatus";
		    });
			wrapper.appendChild(cdPlayer);

			let controlCenter = document.createElement("div");
			controlCenter.className = "controlCenter";
			cdPlayer.appendChild(controlCenter);
			let cdDriver = document.createElement("div");

			if( this._cover ){
				cdDriver.className = "cdDriver";
			}
			else {
				cdDriver.className = "cdDriverOpen";
			}
			cdDriver.innerText = "CD Driver";
			controlCenter.appendChild(cdDriver);			// Top Music Center

			let cdModel = document.createElement("div");
			cdModel.className = "cdModel";
			cdModel.innerText = this.model;
			cdModel.addEventListener("click", () => {
		       this.model = prompt();
		    });
			controlCenter.appendChild(cdModel);

			let leftSideWrap = document.createElement("div");
			leftSideWrap.className = "leftSideWrap";
			controlCenter.appendChild(leftSideWrap);
			let musicCenterState = document.createElement("div");
			if( this.state ){
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
			leftControlBtnsArr[0].addEventListener("click", () => {this.on()});
				/*addEventListener("click", (self) => {
					
			        thisObj.on();
			    });*/
			leftControlBtnsArr[1].innerText = "Off";
			leftControlBtnsArr[1].addEventListener("click", () => {
		        this.off();
		    });
			leftControlBtnsArr[2].innerText = "Play";
			leftControlBtnsArr[2].addEventListener("click", () => {
		        this.play();
		    });
			leftControlBtnsArr[3].innerText = "Stop";
			leftControlBtnsArr[3].addEventListener("click", () => {
		        this.stop();
		    });
			leftControlBtnsArr[4].innerText = "Volume +";
			leftControlBtnsArr[4].addEventListener("click", () => {
		        this.increaseVolume();
		    });
			leftControlBtnsArr[5].innerText = "Volume -";
			leftControlBtnsArr[5].addEventListener("click", () => {
		        this.decreaseVolume();
		    });																// Leftside Control Buttons

			let usbWrapper = document.createElement("div");
			usbWrapper.className = "USBWrapper";
			leftSideWrap.appendChild(usbWrapper);			
			let newElem3 = document.createElement("div");	
			newElem3.innerText = "USB";
			usbWrapper.appendChild(newElem3);
			let usb = document.createElement("div");
			usb.className = "USB";
			usbWrapper.appendChild(usb);					// USBWrapper

			let rightCenterControl = document.createElement("div");
			rightCenterControl.className = "rightCenterControl"
			controlCenter.appendChild(rightCenterControl);

			let rightControlBtnsArr = [];
			for( let i=0; i<7; i++ ){
				rightControlBtnsArr[i] = document.createElement("button");
				rightControlBtnsArr[i].type = "button";
				rightControlBtnsArr[i].className = "controlBtns";
				rightCenterControl.appendChild(rightControlBtnsArr[i]);
			}
			rightControlBtnsArr[0].innerText = "Open CD Driver";
			rightControlBtnsArr[0].addEventListener("click", () => {
		        this.coverUp();
		    });
			rightControlBtnsArr[1].innerText = "Close CD Driver";
			rightControlBtnsArr[1].addEventListener("click", () => {
		        this.coverDown();
		    });
			rightControlBtnsArr[2].innerText = "InsertCD";
			rightControlBtnsArr[2].addEventListener("click", () => {
		        this.insertCD();
		    });
			rightControlBtnsArr[3].innerText = "RemoveCD";
			rightControlBtnsArr[3].addEventListener("click", () => {
		        this.removeCD();
		    });
			rightControlBtnsArr[4].innerText = "Next song";
			rightControlBtnsArr[4].addEventListener("click", () => {
		        this.nextSong();
		    });	
			rightControlBtnsArr[5].innerText = "Previous song";
			rightControlBtnsArr[5].addEventListener("click", () => {
		        this.previousSong();
		    });	
			rightControlBtnsArr[6].innerText = "Set song";
			rightControlBtnsArr[6].addEventListener("click", () => {
		        this.currentSong = prompt();
		    });															// RightSide Control Buttons

			let hidenStatus = document.createElement("div");
			hidenStatus.className = "hidenStatus";
			wrapper.appendChild(hidenStatus);
			Render.renderHidenStatus.call(this, hidenStatus);
		}

		static renderMusicCenter() {

				this._rootElem = document.getElementById("root");
				let wrapper = document.createElement("div");
				
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
					
				
				



				let musicCenter = document.createElement("div");
				musicCenter.className = "musicCenter";
				musicCenter.addEventListener("mouseover", () => {
			        hidenStatus.className = "hidenStatusHover";
			    });
			    musicCenter.addEventListener("mouseout", () => {
			        hidenStatus.className = "hidenStatus";
			    });
				wrapper.appendChild(musicCenter);




				let leftLoudSpeaker = document.createElement("div");
				leftLoudSpeaker.className = "loudSpeaker";
				musicCenter.appendChild(leftLoudSpeaker);
				let model = document.createElement("div");
				model.className = "model";
				model.innerText = this.model;
				model.addEventListener("click", () => {
			       this.model = prompt();
			    });
				leftLoudSpeaker.appendChild(model);
				let speakerCell = document.createElement("div");
				speakerCell.className = "speakerCell";
				leftLoudSpeaker.appendChild(speakerCell);			// Left LoudSpeaker


				let controlCenter = document.createElement("div");
				controlCenter.className = "controlCenter";
				musicCenter.appendChild(controlCenter);
				let cdDriver = document.createElement("div");

				if( this._cover ){
					cdDriver.className = "cdDriver";
				}
				else {
					cdDriver.className = "cdDriverOpen";
				}
				cdDriver.innerText = "CD Driver";
				controlCenter.appendChild(cdDriver);			// Top Music Center

				let leftSideWrap = document.createElement("div");
				leftSideWrap.className = "leftSideWrap";
				controlCenter.appendChild(leftSideWrap);
				let musicCenterState = document.createElement("div");
				if( this.state ){
					musicCenterState.className = "musicCenterStateOn";

				}
				else {
					musicCenterState.className = "musicCenterStateOff";
				}
				leftSideWrap.appendChild(musicCenterState);		// Music Center State

				let radioBtns = document.createElement("div");
				radioBtns.className = "radioBtns";
				leftSideWrap.appendChild(radioBtns);
				let newElem = document.createElement("div");
				newElem.innerText = "Radio";
				let controlBtns = document.createElement("input");
				controlBtns.addEventListener("click", () => {
			        this.increaseFrequency();
			    });



				let leftControlBtnsArr = [];
				for( let i=0; i<8; i++ ){
					leftControlBtnsArr[i] = document.createElement("button");
					leftControlBtnsArr[i].type = "button";
					leftControlBtnsArr[i].className = "controlBtns";
					leftSideWrap.appendChild(leftControlBtnsArr[i]);
				}
				leftControlBtnsArr[0].innerText = "Radio";
				leftControlBtnsArr[0].addEventListener("click", () => {
			        this.changeMod("radio");
			    });
				leftControlBtnsArr[1].innerText = "CD Player";
				leftControlBtnsArr[1].addEventListener("click", () => {
			        this.changeMod("CDPlayer");
			    });
				leftControlBtnsArr[2].innerText = "On";
				leftControlBtnsArr[2].addEventListener("click", () => {
					this.on()
				});

				leftControlBtnsArr[3].innerText = "Off";
				leftControlBtnsArr[3].addEventListener("click", () => {
			        this.off();
			    });
				leftControlBtnsArr[4].innerText = "Play";
				leftControlBtnsArr[4].addEventListener("click", () => {
			        this.play();
			    });
				leftControlBtnsArr[5].innerText = "Stop";
				leftControlBtnsArr[5].addEventListener("click", () => {
			        this.stop();
			    });
				leftControlBtnsArr[6].innerText = "Volume +";
				leftControlBtnsArr[6].addEventListener("click", () => {
			        this.increaseVolume();
			    });
				leftControlBtnsArr[7].innerText = "Volume -";
				leftControlBtnsArr[7].addEventListener("click", () => {
			        this.decreaseVolume();
			    });																// Leftside Control Buttons

				let usbWrapper = document.createElement("div");
				usbWrapper.className = "USBWrapper";
				leftSideWrap.appendChild(usbWrapper);			
				let newElem3 = document.createElement("div");	
				newElem3.innerText = "USB";
				usbWrapper.appendChild(newElem3);
				let usb = document.createElement("div");
				usb.className = "USB";
				usbWrapper.appendChild(usb);					// USBWrapper


				let rightCenterControl = document.createElement("div");
				rightCenterControl.className = "rightCenterControl"
				controlCenter.appendChild(rightCenterControl);

				let rightControlBtnsArr = [];
				for( let i=0; i<10; i++ ){
					rightControlBtnsArr[i] = document.createElement("button");
					rightControlBtnsArr[i].type = "button";
					rightControlBtnsArr[i].className = "controlBtns";
					rightCenterControl.appendChild(rightControlBtnsArr[i]);
				}
				rightControlBtnsArr[0].innerText = "Open CD Driver";
				rightControlBtnsArr[0].addEventListener("click", () => {
			        this.coverUp();
			    });
				rightControlBtnsArr[1].innerText = "Close CD Driver";
				rightControlBtnsArr[1].addEventListener("click", () => {
			        this.coverDown();
			    });
				rightControlBtnsArr[2].innerText = "InsertCD";
				rightControlBtnsArr[2].addEventListener("click", () => {
			        this.insertCD();
			    });
				rightControlBtnsArr[3].innerText = "RemoveCD";
				rightControlBtnsArr[3].addEventListener("click", () => {
			        this.removeCD();
			    });
				rightControlBtnsArr[4].innerText = "Frequency +";
				rightControlBtnsArr[4].addEventListener("click", () => {
			        this.increaseFrequency();
			    });
				rightControlBtnsArr[5].innerText = "Frequency -";	
				rightControlBtnsArr[5].addEventListener("click", () => {
			        this.decreaseFrequency();
			    });	
				rightControlBtnsArr[6].innerText = "Set freq.";
				rightControlBtnsArr[6].addEventListener("click", () => {
			        this.frequency = prompt();
			    });	
				rightControlBtnsArr[7].innerText = "Next song";
				rightControlBtnsArr[7].addEventListener("click", () => {
			        this.nextSong();
			    });	
				rightControlBtnsArr[8].innerText = "Previous song";
				rightControlBtnsArr[8].addEventListener("click", () => {
			        this.previousSong();
			    });	
				rightControlBtnsArr[9].innerText = "Set song";
				rightControlBtnsArr[9].addEventListener("click", () => {
			        this.currentSong = prompt();
			    });															// RightSide Control Buttons


				let rightLoudSpeaker = leftLoudSpeaker.cloneNode(true);
				rightLoudSpeaker.children[0].addEventListener("click", () => {
			       this.model = prompt();
			    });
				musicCenter.appendChild(rightLoudSpeaker);			// Right LoudSpeaker

				let hidenStatus = document.createElement("div");
				hidenStatus.className = "hidenStatus";
				wrapper.appendChild(hidenStatus);
				Render.renderHidenStatus.call(this, hidenStatus);
		}

		static renderTVSet() {

				this._rootElem = document.getElementById("root");
				let wrapper = document.createElement("div");
				
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

				let tvSet = document.createElement("div");
				tvSet.className = "tvSet";
				tvSet.addEventListener("mouseover", () => {
			        hidenStatus.className = "hidenStatusHover";
			    });
			    tvSet.addEventListener("mouseout", () => {
			        hidenStatus.className = "hidenStatus";
			    });
				wrapper.appendChild(tvSet);

				let hidenStatus = document.createElement("div");
				hidenStatus.className = "hidenStatus";
				wrapper.appendChild(hidenStatus);
				Render.renderHidenStatus.call(this, hidenStatus);

				let tvLoudSpeaker = document.createElement("div");
				tvLoudSpeaker.className = "tvLoudSpeaker";
				tvSet.appendChild(tvLoudSpeaker);

				let tvCenterPanel = document.createElement("div");
				tvCenterPanel.className = "tvCenterPanel";
				tvSet.appendChild(tvCenterPanel);

				let tvDisplay = document.createElement("div");
				if(this.state){
					tvDisplay.className = "tvDisplayOn";
				}
				else{
					tvDisplay.className = "tvDisplay";
				}
				
				tvCenterPanel.appendChild(tvDisplay);

				let tvControlPanel = document.createElement("div");
				tvControlPanel.className = "tvControlPanel";
				tvCenterPanel.appendChild(tvControlPanel);

				let tvModel = document.createElement("div");
				tvModel.className = "tvModel";
				tvModel.innerText = this.model;
				tvModel.addEventListener("click", () => {
			        this.model = prompt();
			    });
				tvControlPanel.appendChild(tvModel);

				let tvControlWrapper = document.createElement("div");
				tvControlWrapper.className = "tvControlWrapper";
				tvControlPanel.appendChild(tvControlWrapper);


				let tvControlBtnsArr = [];
				for( let i=0; i<8; i++ ){
					tvControlBtnsArr[i] = document.createElement("button");
					tvControlBtnsArr[i].type = "button";
					tvControlBtnsArr[i].className = "tvControlBtns";
					tvControlWrapper.appendChild(tvControlBtnsArr[i]);
				}
				
				tvControlBtnsArr[0].innerText = "On";
				tvControlBtnsArr[0].addEventListener("click", () => {
			        this.on();
			    });
				tvControlBtnsArr[1].innerText = "Off";
				tvControlBtnsArr[1].addEventListener("click", () => {
			        this.off();
			    });
				tvControlBtnsArr[2].innerText = "Increase volume";
				tvControlBtnsArr[2].addEventListener("click", () => {
			        this.increaseVolume();
			    });
				tvControlBtnsArr[3].innerText = "Decrease volume";
				tvControlBtnsArr[3].addEventListener("click", () => {
			        this.decreaseVolume();
			    });
				tvControlBtnsArr[4].innerText = "Set volume";
				tvControlBtnsArr[4].addEventListener("click", () => {
			        this.volume = prompt();
			    });
				tvControlBtnsArr[5].innerText = "Increase channel";	
				tvControlBtnsArr[5].addEventListener("click", () => {
			        this.increaseChannel();
			    });	
				tvControlBtnsArr[6].innerText = "Decrease channel";
				tvControlBtnsArr[6].addEventListener("click", () => {
			        this.decreaseChannel();
			    });	
				tvControlBtnsArr[7].innerText = "Set channel";
				tvControlBtnsArr[7].addEventListener("click", () => {
			        this.currentChannel = prompt();
			    });	

			    tvSet.appendChild(tvLoudSpeaker.cloneNode());
		}

		static renderHidenStatus (hidenStatus) {		
			let tempArr = ["state" , "model", "volume", "playState", "cover", "CD", "currentSong", "memory", "USBState", "frequency", "mod"];
			for(let i=0; i<tempArr.length; i++){
				if(this[tempArr[i]] != undefined){
					let temp = document.createElement("div");
					temp.innerText = `${tempArr[i]}: ${this[tempArr[i]]}`;
					hidenStatus.appendChild(temp);
				}
			}
		}
	}