	



	let sh = new SmartHouse();
	
	sh.addCDPlayer();
	sh.addCDPlayer();
	sh.addCDPlayer();
	sh.addCDPlayer();
	sh.addCDPlayer();

	sh.addTVSet();
	sh.addTVSet();

	sh.addMusicCenter();
	sh.addMusicCenter();
	sh.addMusicCenter();
	sh.addMusicCenter();

	sh.getDevicesByName("cdplayers")[0].model = "Sony";
	sh.getDevicesByName("cdplayers")[1].model = "Sony";
	sh.getDevicesByName("cdplayers")[2].model = "Toshiba";
	sh.getDevicesByName("cdplayers")[3].model = "Sony";
	sh.getDevicesByName("cdplayers")[4].model = "Sony";
	sh.deleteDevicesByModel("Sony");
	sh.deleteDevicesByName("TVSets");

	console.dir(sh);