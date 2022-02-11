//Date calculations
const currentDate = new Date();

const testDate = new Date("Feb 28 2022 17:56:29");

const oneJan = new Date(currentDate.getFullYear(), 0, 3);

const numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));

const currentWeek = Math.ceil((numberOfDays + 1) / 7);

//Selecting HTML elements
const roomBtn = document.querySelector(".dropbtn");
const dropDown = document.querySelector(".dropdown-menu");
const roomButtons = document.querySelectorAll(".dropdown-menu button");
const fullContainer = document.querySelector(".container");
const headerCleaning = document.getElementById("header-cleaning");
const cleaningButtons = document.querySelectorAll(".cleaning-info button");
const exitButtons = document.querySelectorAll(".fa-times-circle");
const cleaningInfos = document.querySelectorAll(".info-container div");
const dogVideo = document.querySelector(".cute-dog-video");
const cleaningInfoContainer = document.querySelector(".cleaning-info ");
const roomInfo = document.querySelector(".room-info");
const returnButton = document.querySelector(".return-button");
const currentCleanerDiv = document.querySelector(".current-cleaner");

//Constants with room
const numberOfRooms = roomButtons.length;
const rooms = [];
const currentCleaner = currentWeek % numberOfRooms;
let chosenRoom;




const checkLocalStorage = () => {
	if (localStorage.getItem("room") === null) {
		return;
	}
	else {
		chosenRoom = parseInt(localStorage.getItem("room"));
		IsItCleaningWeek(chosenRoom);
	}
	
}

//Cleaning week calculation
const IsItCleaningWeek = (roomNumber) => {
	if (currentCleaner === roomNumber) {
		ChangeThePage("cleaning");
		console.log("CLEAN");
	} else {
		ChangeThePage("relax");
	}
};

const whenDoIClean = () => {
	const calcRoom = (rooms.length - currentCleaner) + chosenRoom;

	console.log("Room length: " + rooms.length);
	console.log("Current cleaner: " + currentCleaner);
	console.log("Chosen room: " + chosenRoom);
	console.log(calcRoom);

	if (calcRoom === 1) {
		return `${calcRoom} vecka`
	}
	else if (calcRoom < 7) {
		return `${calcRoom} veckor`
	}
	else {
		return `${calcRoom - rooms.length} veckor`
	}
}

const ChangeThePage = (typeOf) => {
	//Change CSS-settings
	fullContainer.classList.add(`${typeOf}-week`);

	//Change text
	headerCleaning.innerHTML = `It's ${typeOf} time!`;

	HideFirstPage();

	if (typeOf === "cleaning") {
		cleaningInfoContainer.classList.remove("hide");
	} else {
		currentCleanerDiv.classList.remove("hide");
		currentCleanerDiv.querySelector('h1').innerHTML = `Just nu har ${rooms[currentCleaner]} städvecka`;
		currentCleanerDiv.querySelector('h2').innerHTML = `Du har städvecka om ${whenDoIClean()}`
		dogVideo.classList.remove("hide");
	}

	returnButton.classList.remove("hide");
};
const HideFirstPage = () => {
	roomInfo.classList.add("hide");
};

const ShowRoomInfo = (selRoom) => {
	cleaningInfos[selRoom].classList.add("show");
};

const HideRoomInfo = () => {
	cleaningInfos.forEach((cleaningInfo) => {
		cleaningInfo.classList.remove("show");
	});
};

const ReturnToRoomSelect = () => {
	if (cleaningInfoContainer.classList.contains("hide")) {
		dogVideo.classList.add("hide");
	} else if (dogVideo.classList.contains("hide")) {
		cleaningInfoContainer.classList.add("hide");
	}
	roomInfo.classList.remove("hide");

	returnButton.classList.add("hide");

	fullContainer.removeAttribute("class");

	fullContainer.classList.add("container");

	currentCleanerDiv.classList.add("hide");

	headerCleaning.innerHTML = "Is it cleaning week?";
};
//Adding eventlisteners

//Show the dropdown when the room button is pressed
roomBtn.onclick = () => {
	console.log("click");
	dropDown.classList.toggle("show");
	roomBtn.classList.toggle("hide");
};

roomButtons.forEach((roomBtn, index) => {
	const currentRoom = roomBtn.innerHTML;
	rooms.push(currentRoom);

	roomBtn.addEventListener("click", (e) => {
		if (e.target !== e.currentTarget) return;
		chosenRoom = index;
		localStorage.setItem("room", `${chosenRoom}`);
		IsItCleaningWeek(index);
	});
});

cleaningButtons.forEach((cleaningBtn, index) => {
	cleaningBtn.addEventListener("click", (e) => {
		if (e.target !== e.currentTarget) return;
		ShowRoomInfo(chosenRoom);
	});
});

exitButtons.forEach((exitButton) => {
	exitButton.addEventListener("click", (e) => {
		if (e.target !== e.currentTarget) return;
		HideRoomInfo();
	});
});

returnButton.addEventListener("click", (e) => {
	ReturnToRoomSelect();
});

checkLocalStorage();
