		class TVSet extends Device {
			
			constructor () {
				super();
				this._device = "TVSet";
				this._volume = 5;
				this._currentChannel = 0;
				this._USBInOut = {};
				this._USBState = false;
			}

			connectDevice (newDevice) {
				if( "_USBInOut" in newDevice  && newDevice._USBState == false && this._USBState == false){
					this._USBInOut = newDevice;
					this._USBState = true;
					newDevice._USBState = true;
					return true;
				}
				else {
					console.log("Device can not be connected. Check USB connectivity or USB port is busy")
				}
			}

			disconnectDevice () {
				this._USBInOut._USBState = false;
				this._USBInOut = {};
				this._USBState = false;
			}

			get USBInOut () {
				return this._USBInOut;
			}

			get USBState () {
				return this._USBState;
			}

			increaseVolume () {
				this.doIfDeviceOn( ()=>{
					if(this._volume < 100)
						this._volume += 5;
					this.render();
				} );			
			}

			decreaseVolume () {
				this.doIfDeviceOn( ()=>{
					if(this._volume >=5)
						this._volume -= 5;
					this.render();
				} );
			}

			set volume (level) {
				this.doIfDeviceOn( ()=>{
					let parse = parseInt(level, 10);
					if( isNaN(parse) || parse > 100 || parse < 0 ){
						console.log( "must be 0 < volume >= 100" );
						return;
					}

					this._volume = level;
					this.render();
				} );
			}

			get volume () {
				return this.doIfDeviceOn( ()=>{return this._volume} );
			}

			showVolume () {
				this.doIfDeviceOn( ()=>{console.dir(this._volume)} );
			}

			increaseChannel () {
				this.doIfDeviceOn( ()=>{
					this._currentChannel++;
					this.render();
				} )
			}

			decreaseChannel () {
				this.doIfDeviceOn( ()=>{
					this._currentChannel--;
					this.render();
				} )
			}

			set currentChannel (channel) {
				this.doIfDeviceOn( ()=>{
					let parse = parseInt(channel, 10);
					if( isNaN(parse) || parse > 100 || parse < 0 ){
						console.log( "must be 0 < channel >= 100" );
						return;
					}
					this._currentChannel = channel;
					this.render();
				} );
			}

			get currentChannel () {
				return this._currentChannel;
			}

			on () {
				super.on();
				this._currentChannel = 0;
			}


			render () {				

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
				this.renderHidenStatus(hidenStatus);

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
			        this.decreaseChannel;
			    });	
				tvControlBtnsArr[7].innerText = "Set channel";
				tvControlBtnsArr[7].addEventListener("click", () => {
			        this.currentChannel = prompt();
			    });	


			    tvSet.appendChild(tvLoudSpeaker.cloneNode());						
			}

			renderHidenStatus (hidenStatus) {		
				let tempArr = ["currentChannel", "USBState" , "state" , "model", "volume", "playState", "cover", "CD", "currentSong", "memory", "USBState", "frequency", "mod"];
				for(let i=0; i<tempArr.length; i++){
					if(this[tempArr[i]] != undefined){
						let temp = document.createElement("div");
						temp.innerText = `${tempArr[i]}: ${this[tempArr[i]]}`;
						hidenStatus.appendChild(temp);
					}
				}
			}
		}