		class SmartHouse {
			constructor () {
				this._CDPlayers = [];
				this._TVSets = [];
				this._musicCenters = [];
				this._allDevices = [];
			}

			addCDPlayer () {
				this._CDPlayers[this._CDPlayers.length] = new CDPlayer();
				this._allDevices[this._allDevices.length] = this._CDPlayers[this._CDPlayers.length-1];
				return this._CDPlayers[this._CDPlayers.length-1];
			}

			addTVSet () {
				this._TVSets[this._TVSets.length] = new TVSet();
				this._allDevices[this._allDevices.length] = this._TVSets[this._TVSets.length-1];
				return this._TVSets[this._TVSets.length-1];
			}

			addMusicCenter () {
				this._musicCenters[this._musicCenters.length] = new MusicCenter();
				this._allDevices[this._allDevices.length] = this._musicCenters[this._musicCenters.length-1];
				return this._musicCenters[this._musicCenters.length-1];
			}

			get CDPlayers () {
				return this._CDPlayers;
			}

			get TVSets () {
				return this._TVSets;
			}

			get musicCenters () {
				return this._musicCenters;
			}

			getDevicesByName (deviceName) {
				if(deviceName.toUpperCase() == "CDPlayers".toUpperCase())
					return this["_CDPlayers"];
				if(deviceName.toUpperCase() == "TVSets".toUpperCase())
					return this["_TVSets"];
				if(deviceName.toUpperCase() == "musicCenters".toUpperCase())
					return this["_musicCenters"];
			}

			getDevicesByModel (model) {
				let devices = [];
				for( let deviceStore in this )
					for( let device in  this[deviceStore] )
						if(this[deviceStore][device].model == model)
							devices[devices.length] = this[deviceStore][device];
				if(devices.length == 0)
					return false;
				return devices[0];
			}

			deleteDevicesByName (deviceName) {
				if(deviceName.toUpperCase() == "CDPlayers".toUpperCase())
					this["_CDPlayers"] = [];
				if(deviceName.toUpperCase() == "TVSets".toUpperCase())
					this["_TVSets"] = [];
				if(deviceName.toUpperCase() == "musicCenters".toUpperCase())
					this["_musicCenters"] = [];
			}

			deleteDevicesByModel (model) {
				for( let deviceStore in this ){
					for( let i=0; i < this[deviceStore].length; i++){
						if( this[deviceStore][i].model == model ){
							this[deviceStore][i] = undefined;
						}
					}
					for( let i=0; i < this[deviceStore].length; i++){
						if( this[deviceStore][i] == undefined){
							for( let k=i+1; k < this[deviceStore].length; k++){
								if( this[deviceStore][k] != undefined){
									this[deviceStore][i] = this[deviceStore][k];
									this[deviceStore][k] = undefined;
									break;
								}
							}
						}
					}
					for( let i=0; i<this[deviceStore].length; i++){
						if(this[deviceStore][i] == undefined){
							this[deviceStore].length = i;
						}
					}
				}
			}

			deleteLastAddedDevice () {
				if(this._allDevices[this._allDevices.length - 1]._device == "TVSet"){
					this._allDevices.length --;
					this._TVSets.length --;
					return;
				}
				if(this._allDevices[this._allDevices.length - 1]._device == "CDPlayer"){
					this._allDevices.length --;
					this._CDPlayers.length --;
					return;
				}
				if(this._allDevices[this._allDevices.length - 1]._device == "MusicCenter"){
					this._allDevices.length --;
					this._musicCenters.length --;
					return;
				}
			}

		}