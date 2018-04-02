	
	class Device {
		constructor () {
			this._state = false;
			this._model = "Unnamed";
		}
		on () {
			this._state = true;
			console.dir(this);
		}
		off () {
			this._state = false;
			console.dir(this);
		}
		showState () {
			console.dir(this._state);
		}
		get state () {
			return this._state;
		}

		doIfDeviceOn (func) {
			if(this._state){
				return func();
			}
			else {
				console.log("Sorry, device is off")
				return false;
			}
		}

		set model (model) {
				if(model.length > 20 || typeof model != "string"){
					return console.log("Incorrect value. Model must be less then 20 letters, type \"string\"");
				}

				this._model = model;
				console.dir(this);
		}

		get model () {
			return this._model;
		}

		showModel () {
			console.log(this.model);
		}
	}
