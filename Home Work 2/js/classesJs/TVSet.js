		class TVSet extends Device {
			
			constructor () {
				super();
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
					console.dir(this);
				}
				else {
					console.log("Device can not be connected. Check USB connectivity or USB port is busy")
				}
			}

			disconnectDevice () {
				this._USBInOut._USBState = false;
				this._USBInOut = {};
				this._USBState = false;
				console.dir(this);
			}

			get USBInOut () {
				return this._USBInOut;
			}

			increaseVolume () {
			this.doIfDeviceOn( ()=>{
				if(this._volume < 100)
					this._volume += 5;
			} );
			console.dir(this);			
			}

			decreaseVolume () {
				this.doIfDeviceOn( ()=>{
					if(this._volume >=5)
						this._volume -= 5;
				} );
				console.dir(this);
			}

			set volume (level) {
				this.doIfDeviceOn( ()=>{
					if(typeof level != "number"){
						console.log( "must be typeof(volume) == \"number\"" )
						return;
					}

					if(level > 100){
						console.log( "must be 0 < volume >= 100" );
						return;
					}

					this._volume = level;
				} );
				console.dir(this);
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
					console.dir(this);
				} )
			}

			decreaseChannel () {
				this.doIfDeviceOn( ()=>{
					this._currentChannel--;
					console.dir(this);
				} )
			}

			set currentChannel (channel) {
				this.doIfDeviceOn( ()=>{
					if(typeof channel != "number"){
						console.log( "must be typeof(channel) == \"number\"" )
						return;
					}

					if(channel > 100){
						console.log( "must be 0 < channel >= 100" );
						return;
					}
					this._currentChannel = channel;
				} );
				console.dir(this);
			}

			get currentChannel () {
				return this._currentChannel;
			}

			on () {
				super.on();
				this._currentChannel = 0;
			}


		}