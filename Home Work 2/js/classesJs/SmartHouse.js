		class SmartHouse {
			constructor () {
				this._CDPlayers = [];
				this._TVSets = [];
				this._musicCenters = [];
			}

			addCDPlayer () {
				this._CDPlayers[this._CDPlayers.length] = new CDPlayer();
				console.dir(this);
			}

			addTVSet () {
				this._TVSets[this._TVSets.length] = new TVSet();
				console.dir(this);
			}

			addMusicCenter () {
				this._musicCenters[this._musicCenters.length] = new MusicCenter();
				console.dir(this);
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
							devices[devices.length] = this[deviceStore][device].model;
				return devices;
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

		}