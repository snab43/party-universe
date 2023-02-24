// =============================================================
// UI.ts
// -------------------------------------------------------------
// All functions that pertain to the UI.
// Stat display, door fee, party list, store generator,
// phone apps, etc.
// =============================================================

namespace UI {
	// Notifcation tracking variables.
	let friendSpaceNotifications: number = 0;
	let messagesNotifications: number = 0;
	let storeNotifications: number = 0;

	// =============================================================
	// Update all the stats on the top bar
	// =============================================================
	export function updateStatDisplay(party: number, partyCapacity: number, money: number): void {
		let clout = Utilities.calculateClout(party, money);

		// Stats
		document.getElementById("party")!.innerHTML = `${party} / ${partyCapacity}`;
		document.getElementById("money")!.innerHTML = `$${money.toFixed(2)}`;
		document.getElementById("clout")!.innerHTML = `${clout.toFixed(2)}%`;

		// If party is at capacity, make the Attendee stat red
		if (party >= partyCapacity) {
			document.getElementById("party")?.parentElement?.classList.add("statMaxCapacity");
		} else {
			document.getElementById("party")?.parentElement?.classList.remove("statMaxCapacity");
		}
	}

	// =============================================================
	// Update Door Fee UI
	// =============================================================
	export function updateDoorFee(doorFee: number): void {
		document.getElementById("doorFee")!.innerHTML = `$${doorFee.toFixed(2)}`;
	}

	// =============================================================
	// Updates the Party Goer list with current party people
	// =============================================================
	export function updatePartyList(partyGoers: string[]): void {
		let partyGoerList = document.getElementById("partyGoerList")!;

		// Clear out the list
		partyGoerList.innerHTML = '';

		// Generate a new list
		Array.from(partyGoers).forEach(element => {
			let partyGoer = document.createElement("LI");
			partyGoer.innerText = element;
			partyGoerList.appendChild(partyGoer);
		});
	}

	// =============================================================
	// Updates the store on game tick. Generates all items that are
	// visible to the player, based on how mnuch money they have.
	// =============================================================
	export function updateStore(totalMoney: number): void {
		let storeLists = document.getElementsByClassName("storeList")!;

		// Loops through all store lists
		Array.from(storeLists).forEach(storeList => {
			storeList.innerHTML = '';
			let dataType = storeList.getAttribute("data-type");
			let data: any[];

			// Sets the data from gameInfo.ts
			switch (dataType) {
				case "food": data = FOOD_STATS; break;
				case "drinks": data = DRINK_STATS; break;
				case "decorations": data = DECORATION_STATS; break;
				case "activities": data = ACTIVITY_STATS; break;
				case "promotions": data = PROMOTION_STATS; break;
				case "venues": data = VENUE_STATS; break;
				default: console.log("Error: Found an element with the class 'storeList' without a data-type."); break;
			}

			// For each item in the data, generates a product
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

	// =============================================================
	// Toggles the visibility of the Party Goer list modal
	// =============================================================
	export function togglePartyGoerList() {
		document.getElementById("partyGoerListContainer")!.classList.toggle("hidden");
	}

	// =============================================================
	// Handles the logic for when you select an app.
	// Includes extra logic for clearing out notifications when an
	// app is opened.
	// =============================================================
	export function toggleApp(appIcon: HTMLImageElement) {
		// Clear app icon badge and notification bar icon
		let dataApp = appIcon.getAttribute("data-app");
		document.querySelector(`.appIconBadge[data-app="${dataApp}"]`)?.classList.add("hidden");
		document.querySelector(`.fa-solid[data-app="${dataApp}"]`)?.classList.add("hidden");

		// Sets the notification amount of the relevant app to 0
		switch (dataApp) {
			case "messagesApp": messagesNotifications = 0; break;
			case "friendSpaceApp": friendSpaceNotifications = 0; break;
			case "storeApp": storeNotifications = 0; break;
		}

		// If the Messages app is closed, it removes the existing "Older Messages" header
		if (dataApp == "messagesApp" && !(document.querySelector(`.appContainer[data-app="messagesApp"]`)?.classList.contains('hidden'))) {
			document.getElementById("oldMessagesHeader")?.remove();
		}

		// If the FriendSpace app is closed, it removes the "Older Posts" header
		if (dataApp == "friendSpaceApp" && !(document.querySelector(`.appContainer[data-app="friendSpaceApp"]`)?.classList.contains('hidden'))) {
			document.getElementById("oldPostsHeader")?.remove();
		}

		// Hide other apps and display app that was clicked on
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

	// =============================================================
	// Handles the top bar notification badge and app notification icons
	// =============================================================
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
			if (amount >= 100) {
				appIconBadge.textContent = "99+";
			} else {
				appIconBadge.textContent = `${amount}`;
			}
			
			document.querySelector(`.fa-solid[data-app="${dataApp}"]`)?.classList.remove("hidden");
		}
	}

	// =============================================================
	// Handles changing the phone wallpaper
	// =============================================================
	export function changeWallpaper(wallpaperPickerIcon: HTMLImageElement) {
		let phoneContainer = document.getElementById("phoneContainer")!;
		phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
	}

	// =============================================================
	// Updates time on the phone top bar
	// =============================================================
	export function updateTime(militaryTime: boolean) {
		document.getElementById("notificationTime")!.innerText = Utilities.getHourMinuteTimeStamp(militaryTime);
	}
	
	// =============================================================
	// Disables various UI buttons as needed
	// =============================================================
	export function updateButtons(doorFee: number, party: number, money: number) {
		// Disable DoorFee Down button if at $0
		if (doorFee <= 0) {
			(<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = true;
		} else {
			(<HTMLButtonElement>document.getElementById("doorFeeDown")).disabled = false;
		}
		
		// Disable Kick Someone Out button if party is 0
		if (party <= 0) {
			(<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = true;
		} else {
			(<HTMLButtonElement>document.getElementById("kickSomeoneOut")).disabled = false;
		}
		
		// Disable "send a text" if you have insufficient funds
		if (money < TEXT_COST) {
			(<HTMLButtonElement>document.getElementById("sendAText")).disabled = true;
		} else {
			(<HTMLButtonElement>document.getElementById("sendAText")).disabled = false;
		}
	}
}