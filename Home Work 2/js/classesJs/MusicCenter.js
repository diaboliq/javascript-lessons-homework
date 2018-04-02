		class MusicCenter extends CDPlayer {

			constructor () {
				super();
				this._frequency = 0;
				this._mods = ["radio", "CDPlayer", "USBPlayer"];
				this._mod = this._mods[0];
			}

			nextSong () {
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
						if( this._mods.some( (elem)=>{ return (elem == mod);} ) )
							this._mod = mod;
						else 
						console.log("Incorrect value. Must be \"radio\", \"CDPlayer\"");
					 });
				
				console.dir(this);
			}

			increaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency < 100)
							this._frequency += 5;
					} );
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
				console.dir(this);
			}

			decreaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency >=5)
							this._frequency -= 5;
					} );
				else
					console.log(`Can't do this. Current mod is ${this._mod}`);
				console.dir(this);
			}

			set frequency (freq) {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(typeof freq != "number"){
						console.log( "Must be typeof(frequency) == \"number\"" )
						return;
					}
						if(freq > 100){
						console.log( "Must be 0 < frequency >= 100" );
						return;
					}
						this._frequency = freq;
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
		}