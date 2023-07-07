import { SaveFile } from './models/saveFile.js';
let gameSave = new SaveFile();
document.addEventListener("DOMContentLoaded", function () {
    console.log("DEBUG: DOM loaded.");
    loadUI();
});
function saveGame() {
    gameSave.writeSave();
}
function loadGame() {
    gameSave.loadSave();
    loadUI();
}
function deleteSave() {
    gameSave.deleteSave();
    location.reload();
}
function getHiddenStatsInConsole() {
    console.log(gameSave.getSaveObject());
}
function loadUI() {
    document.getElementById("doorFeeUp").addEventListener("click", changeDoorFeeUp, false);
    document.getElementById("doorFeeDown").addEventListener("click", changeDoorFeeDown, false);
    document.getElementById("digForChange").addEventListener("click", digForChange, false);
    document.getElementById("sendAText").addEventListener("click", sendAText, false);
    document.getElementById("kickSomeoneOut").addEventListener("click", kickSomeoneOut, false);
    document.getElementById("partyGoerListButton").addEventListener("click", UI.togglePartyGoerList, false);
    document.getElementById("submitPostButton").addEventListener("click", submitPost, false);
    document.getElementById("phoneContainer").style.backgroundImage = `url('${gameSave.phoneBackgroundImage}')`;
    Array.from(document.getElementsByClassName("appImg")).forEach(element => {
        element.addEventListener('click', event => {
            UI.toggleApp(event.target);
        });
    });
    Array.from(document.getElementsByClassName("wallpaperPickerIcon")).forEach(element => {
        element.addEventListener('click', event => {
            UI.changeWallpaper(event.target);
            gameSave.phoneBackgroundImage = event.target.src;
        });
    });
    document.getElementById("saveGameButton").addEventListener("click", saveGame, false);
    document.getElementById("loadGameButton").addEventListener("click", loadGame, false);
    document.getElementById("deleteSaveButton").addEventListener("click", deleteSave, false);
    document.getElementById("debugStatsButton").addEventListener("click", getHiddenStatsInConsole, false);
    Array.from(document.getElementsByClassName("modal")).forEach(element => {
        element.addEventListener('click', event => {
            if (event.target == element) {
                element.classList.add("hidden");
            }
        });
    });
    Array.from(document.getElementsByClassName("modalExit")).forEach(element => {
        element.addEventListener('click', event => {
            element.parentElement.parentElement.classList.add("hidden");
        });
    });
    document.getElementById("copyrightYear").innerText = (new Date()).getFullYear();
    document.getElementById("version").innerText = GAME_VERSION;
    updateUI();
    UI.updateStore(gameSave.totalMoney);
    UI.updateDoorFee(gameSave.doorFee);
}
function digForChange() {
    let minChange = MIN_CHANGE;
    let maxChange = MAX_CHANGE;
    minChange = minChange * gameSave.luck;
    if (minChange > maxChange)
        minChange = maxChange;
    let change = (Math.random() * (maxChange - minChange) + minChange);
    change *= gameSave.digForChangeMod;
    change = Utilities.cleanNumber(change, 2);
    gameSave.money += change;
    gameSave.totalMoney += change;
    Utilities.statChange("money", change);
    updateUI();
}
function sendAText() {
    if (gameSave.party >= gameSave.partyCapacity) {
        Social.updateTextMessage(chance.name(), DIALOGUE_NO_ROOM[Math.floor(Math.random() * DIALOGUE_NO_ROOM.length)], "rejectionMessage", gameSave.militaryTime);
    }
    if (gameSave.party < gameSave.partyCapacity && gameSave.money >= TEXT_COST) {
        gameSave.money -= TEXT_COST;
        let chanceOfSuccess = (Utilities.calculateClout(gameSave.party, gameSave.money) * 50 - gameSave.doorFee) / 100;
        if (chanceOfSuccess < 0)
            chanceOfSuccess = 0;
        if (gameSave.doorFee <= 0)
            chanceOfSuccess = 0.5;
        if (chanceOfSuccess >= Math.random()) {
            let partyGoerName = chance.name();
            gameSave.party += 1;
            gameSave.totalParty += 1;
            gameSave.money += gameSave.doorFee;
            gameSave.totalMoney += gameSave.doorFee;
            gameSave.partyGoers.push(partyGoerName);
            Social.updateTextMessage(partyGoerName, DIALOGUE_ACCEPTANCE[Math.floor(Math.random() * DIALOGUE_ACCEPTANCE.length)], "acceptanceMessage", gameSave.militaryTime);
            Utilities.statChange("party", 1);
            Utilities.statChange("money", gameSave.doorFee - TEXT_COST);
        }
        else {
            Social.updateTextMessage(chance.name(), DIALOGUE_REJECTION[Math.floor(Math.random() * DIALOGUE_REJECTION.length)], "rejectionMessage", gameSave.militaryTime);
            Utilities.statChange("money", -TEXT_COST);
        }
    }
    if (gameSave.money <= TEXT_COST) {
        console.log("ERROR: Tried to send a text with no money.");
    }
    updateUI();
}
function kickSomeoneOut() {
    if (gameSave.party > 0) {
        const random = Math.floor(Math.random() * (gameSave.partyGoers.length));
        let partyGoerName = gameSave.partyGoers[random];
        gameSave.partyGoers.splice(random, 1)[0];
        gameSave.party -= 1;
        gameSave.totalKicked += 1;
        gameSave.karma -= 1;
        Social.updateTextMessage(partyGoerName, DIALOGUE_KICKED_OUT[Math.floor(Math.random() * DIALOGUE_KICKED_OUT.length)], "rejectionMessage", gameSave.militaryTime);
        updateUI();
        Utilities.statChange("party", -1);
    }
    else {
        console.log("ERROR: Tried to kick someone out of an empty party.");
    }
}
function changeDoorFeeUp() {
    gameSave.doorFee += 1;
    if (gameSave.doorFee <= 0)
        gameSave.doorFee = 0;
    UI.updateDoorFee(gameSave.doorFee);
}
function changeDoorFeeDown() {
    gameSave.doorFee -= 1;
    if (gameSave.doorFee <= 0)
        gameSave.doorFee = 0;
    UI.updateDoorFee(gameSave.doorFee);
}
function submitPost() {
    let statusUpdate = document.getElementById("statusUpdate");
    if (statusUpdate.value) {
        Social.updateFriendSpaceFeed(gameSave.name, gameSave.partyName, statusUpdate.value, gameSave.militaryTime);
        statusUpdate.value = "";
    }
    else {
        console.log("ERROR: Tried post an empty FriendSpace status update.");
    }
}
function updateUI() {
    UI.updateStatDisplay(gameSave.party, gameSave.partyCapacity, gameSave.money);
    UI.updatePartyList(gameSave.partyGoers);
    UI.updateStore(gameSave.totalMoney);
    UI.updateTime(gameSave.militaryTime);
}
function runRandomEvents() {
    randomEvents.friendSpacePost(gameSave.militaryTime);
    randomEvents.textMessage(gameSave.partyGoers, gameSave.militaryTime);
    randomEvents.friendSpacePostLiked();
}
let mainGameLoop = window.setInterval(function () {
    updateUI();
    runRandomEvents();
}, 1000);
