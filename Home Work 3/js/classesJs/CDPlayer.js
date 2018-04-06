	class CDPlayer extends Player{
		constructor () {
			super();
			this._device = "CDPlayer";
			this._cover = true; // cover = TRUE means cover IS DOWN. cover = FALSE means cover IS UP
			this._CD = false; // CD = FALSE means NO CD INSIDE. CD = TRUE means CD INSIDE
			this._currentSong = 1;
			this._memory = 30;  // cd player memory. measured in the number of songs
			this._USBInOut = {};
			this._USBState = false; // state = FALSE means NO CONNECTIONS in this time. state = TRUE means CONNECTION
		}

		coverUp () {
			if(this._playState == false){
				this._cover = false;
				console.dir(this);
				this.render();
			}
			else {
				console.dir("Can't open the player cover. Player is on \"play\"")
			}
		}

		coverDown () {
			this._cover = true;
			console.dir(this);
			this.render();
		}

		isCoverDown () {
			return this._cover;
		}

		get cover () {
			return this._cover;
		}

		insertCD () {
			if(!this.isCoverDown()){
				this._CD = true;
				this.render();
			}
			else{
				console.log("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
			}
			console.dir(this);
		}

		removeCD () {
			if(!this.isCoverDown()){
				this._CD = false;
				this.render();
			}
			else{
				console.log("Can't remove CD. Plaese, check cover. Cover must be in Up statement")
			}
			console.dir(this);
		}

		get CD () {
			return this._CD;
		}

		isReadyToPlay () {
			if(this.isCoverDown() && this._CD)
				return true;
			return false;
		}

		play () {
			if( this.isReadyToPlay() ){
				super.play();
			}
			else {
				console.log("Can't play. Please, check CD, cover, or power of device")
			}
		}

		nextSong () {
				this.doIfDeviceOn( ()=>{
					if( this._currentSong > this._memory )
						this._currentSong = 1;
					this._currentSong++;
					this.render();
				} );
		}

		previousSong () {
				if( this._currentSong > 1 )
					this.doIfDeviceOn( ()=>{ 
						this._currentSong--; 
						this.render();
					} );	
		}

		set currentSong (song) {
			let parse = parseInt(song, 10);
				if( !isNaN(parse) )
					if( parse > 1 || parse <= this._memory){
						this.doIfDeviceOn ( ()=>{ this._currentSong = parse } );
						this.render();	
					}
				else {
					console.dir("Check device Power/mod/CD presence");
				}
			console.dir(this);
		}

		get currentSong () {
			return this._currentSong;
		}

		showCurrentSong () {
			console.dir(this._currentSong);
		}

		get memory () {
			return this._memory;
		}

		get USBState () {
			return this._USBState;
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
				this.renderHidenStatus(hidenStatus);
						
			}

			renderHidenStatus (hidenStatus) {		
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