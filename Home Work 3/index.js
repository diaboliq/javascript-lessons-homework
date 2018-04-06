	


	let sh = new SmartHouse();

	let rootElem = document.getElementById("root");

	let addCDPlayerBtn = document.createElement("button");
	addCDPlayerBtn.type = "button";
	addCDPlayerBtn.innerText = "Add new CD Player";
	addCDPlayerBtn.className = "addCDPlayerBtn";
	addCDPlayerBtn.addEventListener("click", () => {
		let newPlayer = sh.addCDPlayer();
		newPlayer.render();
	});
	rootElem.appendChild(addCDPlayerBtn);	
	
	let addMusicCenterBtn = document.createElement("button");
	addMusicCenterBtn.type = "button";
	addMusicCenterBtn.innerText = "Add new Music Center";
	addMusicCenterBtn.className = "addMusicCenterBtn";
	addMusicCenterBtn.addEventListener("click", () => {
		let newMusicCenter = sh.addMusicCenter();
		newMusicCenter.render();
	});
	rootElem.appendChild(addMusicCenterBtn);	

	let addTVSetBtn = document.createElement("button");
	addTVSetBtn.type = "button";
	addTVSetBtn.innerText = "Add new TVset";
	addTVSetBtn.className = "addTVSetBtn";
	addTVSetBtn.addEventListener("click", () => {
		let newTVSet = sh.addTVSet();
		newTVSet.render();
	});
	rootElem.appendChild(addTVSetBtn);

	let deleteLastDevice = document.createElement("button");
	deleteLastDevice.type = "button";
	deleteLastDevice.innerText = "Delete last device";
	deleteLastDevice.className = "deleteLastDevice";
	deleteLastDevice.addEventListener("click", () => {
		if(rootElem.children[rootElem.children.length-1].className == "wrapper"){
			rootElem.removeChild(rootElem.children[rootElem.children.length-1]);
			sh.deleteLastAddedDevice();
		}
	});
	rootElem.appendChild(deleteLastDevice);
/*
	let deleteDevicesByModel = document.createElement("button");
	deleteDevicesByModel.type = "button";
	deleteDevicesByModel.innerText = "Delete devices by movel";
	deleteDevicesByModel.className = "deleteDevicesByModel";
	deleteDevicesByModel.addEventListener("click", () => {
		let model = prompt();
		rootElem.removeChild(sh.getDevicesByModel(model));
		sh.deleteDevicesByModel();
	});
	rootElem.appendChild(deleteDevicesByModel);
*/