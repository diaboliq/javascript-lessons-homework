	class Player extends Device {

		constructor () {
			super();
			this._volume = 5;
			this._play = false;
		}// model, 

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

		play () {
			this.doIfDeviceOn( ()=>{this._play = true} );
			console.dir(this);
		}

		stop () {
			this.doIfDeviceOn( ()=>{this._play = false} );
			console.dir(this);	
		}


		
	}