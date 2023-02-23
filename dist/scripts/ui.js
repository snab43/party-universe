"use strict";
var UI;
(function (UI) {
    function updateStatDisplay(party, partyCapacity, money, clout) {
        document.getElementById("party").innerHTML = `${party} / ${partyCapacity}`;
        document.getElementById("money").innerHTML = `$${money.toFixed(2)}`;
        document.getElementById("clout").innerHTML = `${clout.toFixed(2)}%`;
    }
    UI.updateStatDisplay = updateStatDisplay;
    function updateDoorFee(doorFee) {
        document.getElementById("doorFee").innerHTML = `$${doorFee.toFixed(2)}`;
    }
    UI.updateDoorFee = updateDoorFee;
    function updatePartyList(partyGoers) {
        let partyGoerList = document.getElementById("partyGoerList");
        partyGoerList.innerHTML = '';
        Array.from(partyGoers).forEach(element => {
            let partyGoer = document.createElement("LI");
            partyGoer.innerText = element;
            partyGoerList.appendChild(partyGoer);
        });
    }
    UI.updatePartyList = updatePartyList;
    function updateStore(totalMoney) {
        let storeLists = document.getElementsByClassName("storeList");
        Array.from(storeLists).forEach(storeList => {
            storeList.innerHTML = '';
            let dataType = storeList.getAttribute("data-type");
            let data;
            switch (dataType) {
                case "food":
                    data = FOOD_STATS;
                    break;
                case "drinks":
                    data = DRINK_STATS;
                    break;
                case "decorations":
                    data = DECORATION_STATS;
                    break;
                case "activities":
                    data = ACTIVITY_STATS;
                    break;
                case "promotions":
                    data = PROMOTION_STATS;
                    break;
                case "venues":
                    data = VENUE_STATS;
                    break;
                default:
                    console.log("Error: Found an element with the class 'storeList' without a data-type.");
                    break;
            }
            Array.from(data).forEach(item => {
                if (item.cost < totalMoney) {
                    let itemElement = document.createElement("LI");
                    itemElement.id = item.id;
                    itemElement.classList.add('storeItem');
                    itemElement.innerHTML = `
						<div class="storeItemImageContainer"><img src="./images/test.png"></div>
						<div class="storeItemInfoContainer">
							<div class="storeItemName">${item.name}</div>
							<button class="storeItemBuy">Buy ($${item.cost})</button>
						</div>
					`;
                    storeList.appendChild(itemElement);
                }
            });
        });
    }
    UI.updateStore = updateStore;
    function togglePartyGoerList() {
        document.getElementById("partyGoerListContainer").classList.toggle("hidden");
    }
    UI.togglePartyGoerList = togglePartyGoerList;
    function openApp(appIcon) {
        let appContainers = document.getElementsByClassName("appContainer");
        Array.from(appContainers).forEach(appContainer => {
            if (appContainer.getAttribute("data-app") == appIcon.getAttribute("data-app")) {
                appContainer.classList.toggle("hidden");
            }
            else {
                appContainer.classList.add("hidden");
            }
        });
    }
    UI.openApp = openApp;
    function changeWallpaper(wallpaperPickerIcon) {
        let phoneContainer = document.getElementById("phoneContainer");
        phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
    }
    UI.changeWallpaper = changeWallpaper;
    function updateButtons() {
        let percentToReveal = 2;
    }
    UI.updateButtons = updateButtons;
})(UI || (UI = {}));
