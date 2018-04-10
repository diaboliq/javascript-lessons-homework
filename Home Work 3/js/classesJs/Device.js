	
	class Device {
		constructor () {
			this._state = false;
			this._model = "Change model";
		}
		on () {
			this._state = true;
			render.call(this);
		}
		off () {
			if(this._playState){
				this._playState = false;
			}
			this._state = false;
			render.call(this);
		}
		showState () {
			Render.viewMessage(this._state);
		}
		get state () {
			return this._state;
		}

		doIfDeviceOn (func) {
			if(this._state){
				return func();
			}
			else {
				Render.viewMessage("Sorry, device is off")
				return false;
			}
		}

		set model (model) {
				if(model === null || model.length > 20 || model === ""){
					return Render.viewMessage("Incorrect value. Model must be less then 20 letters, type \"string\"");
				}
				let result = 0;
				for(var i=1; i<=model.length; i++){
					if(model[i-1] == " ")
						result++;
				}
				if(result == model.length)
						return Render.viewMessage("Incorrect value. Model must be less then 20 letters, type \"string\"");

				this._model = model;
				render.call(this);
		}

		get model () {
			return this._model;
		}

		showModel () {
			Render.viewMessage(this.model);
		}
	}
