"use strict";
var UI;
(function (UI) {
    let friendSpaceNotifications = 0;
    let messagesNotifications = 0;
    let storeNotifications = 0;
    function updateStatDisplay(party, partyCapacity, money) {
        var _a, _b, _c, _d;
        let clout = Utilities.calculateClout(party, money);
        document.getElementById("party").innerHTML = `${party} / ${partyCapacity}`;
        document.getElementById("money").innerHTML = `$${money.toFixed(2)}`;
        document.getElementById("clout").innerHTML = `${clout.toFixed(2)}%`;
        if (party >= partyCapacity) {
            (_b = (_a = document.getElementById("party")) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add("statMaxCapacity");
        }
        else {
            (_d = (_c = document.getElementById("party")) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.remove("statMaxCapacity");
        }
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
    function toggleApp(appIcon) {
        var _a, _b, _c, _d, _e, _f;
        let dataApp = appIcon.getAttribute("data-app");
        (_a = document.querySelector(`.appIconBadge[data-app="${dataApp}"]`)) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        (_b = document.querySelector(`.fa-solid[data-app="${dataApp}"]`)) === null || _b === void 0 ? void 0 : _b.classList.add("hidden");
        switch (dataApp) {
            case "messagesApp":
                messagesNotifications = 0;
                break;
            case "friendSpaceApp":
                friendSpaceNotifications = 0;
                break;
            case "storeApp":
                storeNotifications = 0;
                break;
        }
        if (dataApp == "messagesApp" && !((_c = document.querySelector(`.appContainer[data-app="messagesApp"]`)) === null || _c === void 0 ? void 0 : _c.classList.contains('hidden'))) {
            (_d = document.getElementById("oldMessagesHeader")) === null || _d === void 0 ? void 0 : _d.remove();
        }
        if (dataApp == "friendSpaceApp" && !((_e = document.querySelector(`.appContainer[data-app="friendSpaceApp"]`)) === null || _e === void 0 ? void 0 : _e.classList.contains('hidden'))) {
            (_f = document.getElementById("oldPostsHeader")) === null || _f === void 0 ? void 0 : _f.remove();
        }
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
    UI.toggleApp = toggleApp;
    function appNotification(dataApp) {
        var _a;
        if (document.querySelector(`.appContainer[data-app="${dataApp}"]`).classList.contains('hidden')) {
            let amount = 0;
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
            let appIconBadge = document.querySelector(`.appIconBadge[data-app="${dataApp}"]`);
            appIconBadge.classList.remove("hidden");
            if (amount >= 100) {
                appIconBadge.textContent = "99+";
            }
            else {
                appIconBadge.textContent = `${amount}`;
            }
            (_a = document.querySelector(`.fa-solid[data-app="${dataApp}"]`)) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        }
    }
    UI.appNotification = appNotification;
    function changeWallpaper(wallpaperPickerIcon) {
        let phoneContainer = document.getElementById("phoneContainer");
        phoneContainer.style.backgroundImage = `url('${wallpaperPickerIcon.src}')`;
    }
    UI.changeWallpaper = changeWallpaper;
    function updateTime(militaryTime) {
        document.getElementById("notificationTime").innerText = Utilities.getHourMinuteTimeStamp(militaryTime);
    }
    UI.updateTime = updateTime;
    function updateButtons(doorFee, party, money) {
        if (doorFee <= 0) {
            document.getElementById("doorFeeDown").disabled = true;
        }
        else {
            document.getElementById("doorFeeDown").disabled = false;
        }
        if (party <= 0) {
            document.getElementById("kickSomeoneOut").disabled = true;
        }
        else {
            document.getElementById("kickSomeoneOut").disabled = false;
        }
        if (money < TEXT_COST) {
            document.getElementById("sendAText").disabled = true;
        }
        else {
            document.getElementById("sendAText").disabled = false;
        }
    }
    UI.updateButtons = updateButtons;
})(UI || (UI = {}));
