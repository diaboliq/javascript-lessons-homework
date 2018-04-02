	class CDPlayer extends Player{
		constructor () {
			super();
			this._cover = true; // cover = TRUE means cover IS DOWN. cover = FALSE means cover IS UP
			this._CD = false; // CD = FALSE means NO CD INSIDE. CD = TRUE means CD INSIDE
			this._currentSong = 0;
			this._memory = 30;  // cd player memory. measured in the number of songs
			this._USBInOut = {};
			this._USBState = false; // state = FALSE means NO CONNECTIONS in this time. state = TRUE means CONNECTION
		}

		coverUp () {
			if(this._play == false){
				this._cover = false;
				console.dir(this);
			}
			else {
				console.dir("Can't open the player cover. Player is on \"play\"")
			}
		}

		coverDown () {
			this._cover = true;
			console.dir(this);
		}

		isCoverDown () {
			return this._cover;
		}

		insertCD () {
			if(!this.isCoverDown())
				this._CD = true;
			else{
				console.log("Can't insert CD. Plaese, check cover. Cover must be in Up statement")
			}
			console.dir(this);
		}

		removeCD () {
			if(this.isCoverDown())
				this._CD = false;
			console.dir(this);
		}

		isReadyToPlay () {
			if(this.isCoverDown() && this._CD == true)
				return true;
			return false;
		}

		play () {
			if( this.isReadyToPlay() ){
				super.play();
				return true;
			}
			else {
				console.log("Can't play. Please, check CD, cover, or power of device")
			}
		}

		nextSong () {
			if(this.play()){
				this.doIfDeviceOn( ()=>{
					if( this._currentSong > this._memory )
						this._currentSong = 0;
					this._currentSong++;
				} );
			}
				console.dir(this);
		}

		previousSong () {
			if(this.play()){
				if( this._currentSong > 1 )
					this.doIfDeviceOn( ()=>{ this._currentSong-- } );
			}
			console.dir(this);
		}

		set currentSong (song) {
			if(this.play){
				if(typeof song == "number")
					if( song > 1 || song <= this._memory)
						this.doIfDeviceOn ( ()=>{ this._currentSong = song } );
			}
			console.dir(this);
		}

		get currentSong () {
			return this._currentSong;
		}

		showCurrentSong () {
			console.dir(this._currentSong);
		}
	}