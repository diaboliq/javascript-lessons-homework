		class MusicCenter extends CDPlayer {

			constructor () {
				super();
				this._device = "MusicCenter"
				this._frequency = 0;
				this._mods = ["radio", "CDPlayer", "USBPlayer"];
				this._mod = this._mods[0];
			}

			nextSong () {
				console.dir(this);
				if(this._mod == this._mods[1])
					super.nextSong();
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
			}

			previousSong () {
				if(this._mod == this._mods[1])
					super.previousSong();
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
			}

			changeMod (mod) {
					this.doIfDeviceOn( ()=>{
						if( this._mods.some( (elem)=>{ return (elem == mod);} ) ){
							this._mod = mod;
							this.render();
						}
						else 
						console.log("Incorrect value. Must be \"radio\", \"CDPlayer\"");
					 });
				
				console.dir(this);
			}

			get mod () {
				return this._mod;
			}

			increaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency < 100){
							this._frequency += 5;
							this.render();
						}
					} );
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
				console.dir(this);
			}

			decreaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency >=5){
							this._frequency -= 5;
							this.render();
						}
					} );
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
				console.dir(this);
			}

			set frequency (freq) {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						
						let parse = parseInt(freq, 10);
						if( isNaN(parse) || parse > 100 || parse < 0 ){
							console.log( "Must be 0 < frequency >= 100" );
							return;
						}
						this._frequency = freq;
						this.render();
					} );
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);

				console.dir(this);
			}

			get frequency () {
				return this._frequency;
			}

			showFrequency () {
				console.log(this._frequency);
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