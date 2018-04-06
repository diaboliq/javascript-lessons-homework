	
	class Device {
		constructor () {
			this._state = false;
			this._model = "Change model";
		}
		on () {
			this._state = true;
			this.render();
		}
		off () {
			this._state = false;
			this.render();
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
				if(model === null || model.length > 20 || model === ""){
					return console.log("Incorrect value. Model must be less then 20 letters, type \"string\"");
				}
				let result = 0;
				for(var i=1; i<=model.length; i++){
					if(model[i-1] == " ")
						result++;
				}
				if(result == model.length)
						return console.log("Incorrect value. Model must be less then 20 letters, type \"string\"");

				this._model = model;
				this.render();
				console.dir(this);
		}

		get model () {
			return this._model;
		}

		showModel () {
			console.log(this.model);
		}
	}
