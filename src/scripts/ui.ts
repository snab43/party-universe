namespace UI {
	let friendSpaceNotifications: number = 0;
	let messagesNotifications: number = 0;
	let storeNotifications: number = 0;

	export function updateStatDisplay(party: number, partyCapacity: number, money: number, clout: number): void {
		//updateButtons();
		//updateClout();
		
		// Stats
		document.getElementById("party")!.innerHTML = `${party} / ${partyCapacity}`;
		document.getElementById("money")!.innerHTML = `$${money.toFixed(2)}`;
		document.getElementById("clout")!.innerHTML = `${clout.toFixed(2)}%`;
	}

	export function updateDoorFee(doorFee: number): void {
		document.getElementById("doorFee")!.innerHTML = `$${doorFee.toFixed(2)}`;
	}

	export function updatePartyList(partyGoers: string[]): void {
		let partyGoerList = document.getElementById("partyGoerList")!;
		partyGoerList.innerHTML = '';
		Array.from(partyGoers).forEach(element => {
			let partyGoer = document.createElement("LI");
			partyGoer.innerText = element;
			partyGoerList.appendChild(partyGoer);
		});
	}

	export function updateStore(totalMoney: number): void {
		let storeLists = document.getElementsByClassName("storeList")!;

		Array.from(storeLists).forEach(storeList => {
			storeList.innerHTML = '';
			let dataType = storeList.getAttribute("data-type");
			let data: any[];

			switch (dataType) {
				case "food": data = FOOD_STATS; break;
				case "drinks": data = DRINK_STATS; break;
				case "decorations": data = DECORATION_STATS; break;
				case "activities": data = ACTIVITY_STATS; break;
				case "promotions": data = PROMOTION_STATS; break;
				case "venues": data = VENUE_STATS; break;
				default: console.log("Error: Found an element with the class 'storeList' without a data-type."); break;
			}

			Array.from(data!).forEach(item => {
				if (item.cost < totalMoney) {
					//appNotification("storeApp");

					let itemElement = document.createElement("LI");
					itemElement.id = item.id;
					itemElement.classList.add('storeItem');
					itemElement.innerHTML = `
						<div class="storeItemImageContainer"><img src="./images/test.png"></div>
						<div class="storeItemInfoContainer">
							<div class="storeItemName">${item.name}</div>
							<button class="storeItemBuy">Buy ($${item.cost})</button>
						</div>
					`
					storeList.appendChild(itemElement);
				}
			});
		});
	}

	export function togglePartyGoerList() {
		document.getElementById("partyGoerListContainer")!.classList.toggle("hidden");
	}

	export function toggleApp(appIcon: HTMLImageElement) {
		// Clear app icon badge and notification bar icon
		let dataApp = appIcon.getAttribute("data-app");
		document.querySelector(`.appIconBadge[data-app="${dataApp}"]`)?.classList.add("hidden");
		document.querySelector(`.fa-solid[data-app="${dataApp}"]`)?.classList.add("hidden");

		switch (dataApp) {
			case "messagesApp": messagesNotifications = 0; break;
			case "friendSpaceApp": friendSpaceNotifications = 0; break;
			case "storeApp": storeNotifications = 0; break;
		}

		if (dataApp == "messagesApp" && !(document.querySelector(`.appContainer[data-app="messagesApp"]`)?.classList.contains('hidden'))) {
			document.getElementById("oldMessagesHeader")?.remove();
		}

		if (dataApp == "friendSpaceApp" && !(document.querySelector(`.appContainer[data-app="friendSpaceApp"]`)?.classList.contains('hidden'))) {
			document.getElementById("oldPostsHeader")?.remove();
		}

		// Hide other apps and display app
		let appContainers = document.getElementsByClassName("appContainer");

		Array.from(appContainers).forEach(appContainer => {
			if (appContainer.getAttribute("data-app") == appIcon.getAttribute("data-app")) {
				appContainer.classList.toggle("hidden");
				//appIcon.classList.toggle("activeApp");
			} else {
				appContainer.classList.add("hidden");
			}
		});
	}

	export function appNotification(dataApp: string) {
		if (document.querySelector(`.appContainer[data-app="${dataApp}"]`)!.classList.contains('hidden')) {
			let amount: number = 0;

			switch (dataApp) {
				case "messagesApp":
					messagesNotifications += 1;
					amount = messagesNotifications;
					break;
				case "friendSpaceApp":
					friendSpaceNotifications += 1;
					amount = friendSpaceNotifications;
					break;
				case "storeApp":
					storeNotifications += 1;
					amount = storeNotifications;
					break;
			}

			let appIconBadge = document.querySelector(`.appIconBadge[data-app="${dataApp}"]`)!;
			appIconBadge.classList.remove("hidden");
			appIconBadge.textContent = `${amount}`;

			document.querySelector(`.fa-solid[data-app="${dataApp}"]`)?.classList.remove("hidden");
		}
	}

	export function changeWallpaper(wallpaperPickerIcon: HTMLImageElement) {
		let phoneContainer = document.getElementById("phoneContainer")!;
		phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
	}

	export function updateTime(militaryTime: boolean) {
		document.getElementById("notificationTime")!.innerText = Utilities.getHourMinuteTimeStamp(militaryTime);
	}
	
	export function updateButtons() {
		// -------------------------------------------------------------
		// List generators
		// -------------------------------------------------------------
		let percentToReveal = 2; // What percentage of totalMoney to reveal an item.
		
		/*
		// Generate Supply List
		let supplyList = document.getElementById("suppliesList")!;
		supplyList.innerHTML = "";
		for (let i = ITEM_INFO.FSUPPLY; i <= ITEM_INFO.LSUPPLY; i++) {
			let info = ITEM_STATS.supplies[i];
			let data = gameSave.supplies[i];
			
			if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
				let newItem = document.createElement("DIV");
				newItem.innerHTML = `
					<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
				`;
				
				supplyList.appendChild(newItem);
				
				if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
				else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
			}
		}
	
		// Generate Drink List
		let drinkList = document.getElementById("drinkList")!;
		drinkList.innerHTML = "";
		for (let i = ITEM_INFO.FDRINKS; i <= ITEM_INFO.LDRINKS; i++) {
			let info = ITEM_STATS.drinks[i];
			let data = gameSave.drinks[i];
			
			if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
				let newItem = document.createElement("DIV");
				newItem.innerHTML = `
					<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
				`;
				
				drinkList.appendChild(newItem);
				
				if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
				else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
			}
		}
		
		// Generate Promotions List
		let promotionsList = document.getElementById("promotionsList")!;
		promotionsList.innerHTML = "";
		for (let i = ITEM_INFO.FPROMO; i <= ITEM_INFO.LPROMO; i++) {
			let info = ITEM_STATS.promotions[i];
			let data = gameSave.promotions[i];
			
			if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
				let newItem = document.createElement("DIV");
				newItem.innerHTML = `
					<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
				`;
				
				promotionsList.appendChild(newItem);
				
				if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
				else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
			}
		}
	
		// Generate Venues List
		let venuesList = document.getElementById("venuesList")!;
		venuesList.innerHTML = "";
		for (let i = ITEM_INFO.FVENUE; i <= ITEM_INFO.LVENUE; i++) {
			let info = ITEM_STATS.venues[i];
			let data = gameSave.venues[i];
			
			if (i == 100 || gameSave.totalMoney > info.cost * percentToReveal) {
				let newItem = document.createElement("DIV");
				newItem.innerHTML = `
					<span id="${info.id}">${data.amount} ${info.name}</span> <button onclick="buySupplies(${i})">Buy ($${info.cost * data.costMod})</button></br>
				`;
				
				venuesList.appendChild(newItem);
				
				if (gameSave.money < info.cost) (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = true;
				else (<HTMLButtonElement>newItem.lastChild!.previousSibling!).disabled = false;
			}
		}
		*/
		
		/*
		// -------------------------------------------------------------
		// Button disables
		// -------------------------------------------------------------
		if (gameSave.doorFee <= 0) (<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = true;
		else (<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = false;
			
		if (gameSave.party <= 1) (<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = true;
		else (<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = false;
		
		if (gameSave.money < 0.25) (<HTMLButtonElement>document.getElementById("sendAText")).disabled = true;
		else (<HTMLButtonElement>document.getElementById("sendAText")).disabled = false;
		*/
	}
}