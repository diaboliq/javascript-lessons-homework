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
				render.call(this);
			}
			else {
				Render.viewMessage("Can't open the player cover. Player is on \"play\"")
			}
		}

		coverDown () {
			this._cover = true;
			render.call(this);
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
				render.call(this);
			}
			else{
				Render.viewMessage("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
			}
		}

		removeCD () {
			if(!this.isCoverDown()){
				this._CD = false;
				render.call(this);
			}
			else{
				Render.viewMessage("Can't remove CD. Plaese, check cover. Cover must be in Up statement")
			}
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
				Render.viewMessage("Can't play. Please, check CD, cover, or power of device")
			}
		}

		nextSong () {
				this.doIfDeviceOn( ()=>{
					if( this._currentSong > this._memory )
						this._currentSong = 1;
					this._currentSong++;
					render.call(this);
				} );
		}

		previousSong () {
				if( this._currentSong > 1 )
					this.doIfDeviceOn( ()=>{ 
						this._currentSong--; 
						render.call(this);
					} );	
		}

		set currentSong (song) {
			let parse = parseInt(song, 10);
				if( !isNaN(parse) )
					if( parse > 1 || parse <= this._memory){
						this.doIfDeviceOn ( ()=>{ this._currentSong = parse } );
						render.call(this);
					}
				else {
					Render.viewMessage("Check device Power/mod/CD presence");
				}
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
	}