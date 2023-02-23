"use strict";
var Social;
(function (Social) {
    function updateTextMessage(name, message, type, militaryTime) {
        let newItem = document.createElement("LI");
        newItem.classList.add(type);
        newItem.innerHTML = `
			<b>${name}</b></br>
			<p>${message}</p>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; SMS
		`;
        let list = document.getElementById("textMessages");
        list.insertBefore(newItem, list.childNodes[0]);
    }
    Social.updateTextMessage = updateTextMessage;
    function updateFriendSpaceFeed(name, locationFrom, message, militaryTime) {
        let newItem = document.createElement("LI");
        newItem.innerHTML = `
			<b>${name}</b></br>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; ${locationFrom}</small></br>
			<p>${message}</p>
			<small>Like &#8226; Comment &#8226; Share
		`;
        let list = document.getElementById("friendSpaceFeed");
        list.insertBefore(newItem, list.childNodes[0]);
    }
    Social.updateFriendSpaceFeed = updateFriendSpaceFeed;
})(Social || (Social = {}));
