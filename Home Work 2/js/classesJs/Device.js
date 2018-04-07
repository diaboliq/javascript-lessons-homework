function Device () {

	this._state = false;
	this._model = "Unnamed";
}

Device.prototype.on  = function() {
	this._state = true;
	this.render();
}

Device.prototype.off  = function() {
	if(this._playState){
		this._playState = false;
	}
	this._state = false;
	this.render();
}

Device.prototype.showState  = function() {
	console.dir(this._state);
}

Device.prototype.getState = function() {
	return this._state;
}

Device.prototype.doIfDeviceOn = function(func) {
	if(this._state){
		return func.call(this);
	}
	else {
		console.log("Sorry, device is off")
		return false;
	}
}

Device.prototype.setModel = function(model) {
	if(model === null || model.length > 20 || model === ""){
		return console.log("Incorrect value. Model must be less then 20 letters, type \"string\"");
	}

	let result = 0;
	
	for(var i=1; i <= model.length; i++){
		if(model[i-1] == " "){
			result++;
		}
	}

	if(result == model.length){
		return console.log("Incorrect value. Model must be less then 20 letters, type \"string\"");
	}

	this._model = model;
	this.render();
}

Device.prototype.getModel = function() {
	return this._model;
}

Device.prototype.showModel = function() {
	console.dir(this._model);
}