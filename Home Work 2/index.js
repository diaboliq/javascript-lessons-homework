
var render = new Render().render;


var sh = new SmartHouse();

var rootElem = document.getElementById("root");

var addCDPlayerBtn = document.createElement("button");
addCDPlayerBtn.type = "button";
addCDPlayerBtn.innerText = "Add new CD Player";
addCDPlayerBtn.className = "addCDPlayerBtn";
addCDPlayerBtn.addEventListener("click", function() {
	var newPlayer = sh.addCDPlayer();
	render.call(newPlayer);
});
rootElem.appendChild(addCDPlayerBtn);	
	
var addMusicCenterBtn = document.createElement("button");
addMusicCenterBtn.type = "button";
addMusicCenterBtn.innerText = "Add new Music Center";
addMusicCenterBtn.className = "addMusicCenterBtn";
addMusicCenterBtn.addEventListener("click", function() {
	var newMusicCenter = sh.addMusicCenter();
	render.call(newMusicCenter);
});
rootElem.appendChild(addMusicCenterBtn);	

var addTVSetBtn = document.createElement("button");
addTVSetBtn.type = "button";
addTVSetBtn.innerText = "Add new TVset";
addTVSetBtn.className = "addTVSetBtn";
addTVSetBtn.addEventListener("click", function() {
	var newTVSet = sh.addTVSet();
	render.call(newTVSet);
});
rootElem.appendChild(addTVSetBtn);

var deleteLastDevice = document.createElement("button");
deleteLastDevice.type = "button";
deleteLastDevice.innerText = "Delete last device";
deleteLastDevice.className = "deleteLastDevice";
deleteLastDevice.addEventListener("click", function() {
	if(rootElem.children[rootElem.children.length-1].className == "wrapper"){
		rootElem.removeChild(rootElem.children[rootElem.children.length-1]);
		sh.deleteLastAddedDevice();
	}
});
rootElem.appendChild(deleteLastDevice);