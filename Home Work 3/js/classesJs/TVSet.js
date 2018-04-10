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
					render.call(this);
				} );			
			}

			decreaseVolume () {
				this.doIfDeviceOn( ()=>{
					if(this._volume >=5)
						this._volume -= 5;
					render.call(this);
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
					render.call(this);
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
					render.call(this);
				} )
			}

			decreaseChannel () {
				this.doIfDeviceOn( ()=>{
					this._currentChannel--;
					render.call(this);
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
					render.call(this);
				} );
			}

			get currentChannel () {
				return this._currentChannel;
			}

			on () {
				super.on();
				this._currentChannel = 0;
			}
		}