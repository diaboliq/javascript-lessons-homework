		class MusicCenter extends CDPlayer {

			constructor () {
				super();
				this._device = "MusicCenter";
				this._frequency = 0;
				this._mods = ["radio", "CDPlayer", "USBPlayer"];
				this._mod = this._mods[0];
			}

			nextSong () {
				if(this._mod == this._mods[1])
					super.nextSong();
				else
					Render.viewMessage(`Can't do this. Current mod is ${this._mod}`);
			}

			previousSong () {
				if(this._mod == this._mods[1])
					super.previousSong();
				else
					Render.viewMessage(`Can't do this. Current mod is ${this._mod}`);
			}

			changeMod (mod) {
					this.doIfDeviceOn( ()=>{
						if( this._mods.some( (elem)=>{ return (elem == mod);} ) ){
							this._mod = mod;
							render.call(this);
						}
						else 
						Render.viewMessage("Incorrect value. Must be \"radio\", \"CDPlayer\"");
					 });
			}

			get mod () {
				return this._mod;
			}

			increaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency < 100){
							this._frequency += 5;
							render.call(this);
						}
					} );
				else
					Render.viewMessage(`Can't do this. Current mod is ${this._mod}`);
			}

			decreaseFrequency () {
				if(this._mod == this._mods[0])
					this.doIfDeviceOn( ()=>{
						if(this._frequency >=5){
							this._frequency -= 5;
							render.call(this);
						}
					} );
				else{
					Render.viewMessage(`Can't do this. Current mod is ${this._mod}`);
				}
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
						render.call(this);
					} );
				else{
					Render.viewMessage(`Can't do this. Current mod is ${this._mod}`);
				}
			}

			get frequency () {
				return this._frequency;
			}

			showFrequency () {
				Render.viewMessage(this._frequency);
			}

		}