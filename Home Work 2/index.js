	
	// 		Почти в каждой операции устройство выводит в консоль свое состояние для того
	// чтобы можно было удобно отслеживать наличие ошибок.
	// Убирайте по комментарию на каждой строке и отследите работу программы. Спасибо)


	let sh = new SmartHouse();
	
	sh.addCDPlayer();	// Создаю экземпляр класса СДплеера
	sh.addCDPlayer();	
	sh.addTVSet();		// Создаю экземпляр класса телевизора
	sh.addMusicCenter();// Создаю экзампляр класса музыкального центра

//	cdPlayers = sh.CDPlayers;		// Записываю в переменные для удобства работы
//	tvSets = sh.TVSets;				
//	musicCenters = sh.musicCenters;	


//	cdPlayers[0].model = "Toshiba";	// Присваиваю модели устройств
//	cdPlayers[1].model = "Sony";	

//	musicCenters[0].model = "Panasonic";

//	tvSets[0].model = "LG";

//	cdPlayers[0].coverUp();		// Открываю крышку плеера
//	cdPlayers[0].insertCD();	// Вставляю диск
//	cdPlayers[0].coverDown();	// Закрываю крышку
//	cdPlayers[0].play();		// Нажимаю кнопку "Проигрывать" \\ Получаю предупреждение
//	cdPlayers[0].on();			// Включаю плеер
//	cdPlayers[0].play();		// Нажимаю кнопку "Проигрывать"
//	cdPlayers[0].coverUp();		// Открываю крышку \\ Получаю предупреждение
//	cdPlayers[0].stop();		// Останавливаю проигрывание
//	cdPlayers[0].coverUp();		// Открываю крышку
//	cdPlayers[0].removeCD();	// Достаю диск
//	cdPlayers[0].coverDown();	// Закрываю крышку

//	tvSets[0].connectDevice(cdPlayers[0]);		// Подключаю плеер к телевизору по USB
//	cdPlayers[0].coverUp();						// Открываю крышку плеера
//	cdPlayers[0].insertCD();					// Вставляю диск
//	cdPlayers[0].coverDown();					// Закрываю крышку плеера
//	tvSets[0].USBInOut.play();					// Через телевизор управляю плеером. Т.к. плеер включен, то предупреждения не будет
//	tvSets[0].USBInOut.increaseVolume();		// Увеличиваю громкость плеера
//	tvSets[0].USBInOut.stop();					// Останавливаю проигрывание плеера
//	tvSets[0].connectDevice(musicCenters[0]);	// Пытаюсь подключить другое устройство на занятый порт
//	tvSets[0].disconnectDevice();				// Отключаю устройство

//	tvSets[0].connectDevice(musicCenters[0]);	// Подключаю музыкальный центр к телевизору, получаю доступ к управлению муз.центром
//	tvSets[0].USBInOut.on();					// 
//	tvSets[0].USBInOut.coverUp();				//
//	tvSets[0].USBInOut.insertCD();				//
//	tvSets[0].USBInOut.coverDown();				//
//	tvSets[0].USBInOut.play();					//
//	tvSets[0].USBInOut.nextSong();				// Переключаю на следующую песню \\ Получаю предупреждение
//	tvSets[0].USBInOut.frequency = 70;			// Меняю частоту радио
//	tvSets[0].USBInOut.changeMod("CDPlayer");	// Меняю мод муз.центра на проигрыватель
//	tvSets[0].USBInOut.nextSong();				// Переключаю на следующую песню

