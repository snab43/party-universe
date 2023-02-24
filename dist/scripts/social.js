"use strict";
var Social;
(function (Social) {
    function updateTextMessage(name, message, type, militaryTime) {
        UI.appNotification("messagesApp");
        let newItem = document.createElement("LI");
        newItem.classList.add(type);
        newItem.innerHTML = `
			<b>${name}</b></br>
			<p>${message}</p>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; SMS
		`;
        let list = document.getElementById("textMessages");
        if (document.querySelector(`.appContainer[data-app="messagesApp"]`).classList.contains('hidden')) {
            if (document.getElementById("oldMessagesHeader")) {
                list.insertBefore(newItem, list.childNodes[0]);
            }
            else {
                let oldMessageHeader = document.createElement("LI");
                oldMessageHeader.id = "oldMessagesHeader";
                oldMessageHeader.innerHTML = `<h3>Older Messages</h3>`;
                list.insertBefore(oldMessageHeader, list.childNodes[0]);
                list.insertBefore(newItem, list.childNodes[0]);
            }
        }
        else {
            list.insertBefore(newItem, list.childNodes[0]);
        }
    }
    Social.updateTextMessage = updateTextMessage;
    function updateFriendSpaceFeed(name, locationFrom, message, militaryTime) {
        UI.appNotification("friendSpaceApp");
        let newItem = document.createElement("LI");
        newItem.classList.add('friendSpacePost');
        newItem.innerHTML = `
			<b>${name}</b></br>
			<small>${Utilities.getHourMinuteTimeStamp(militaryTime)} &#8226; ${locationFrom}</small></br>
			<p>${message}</p>
			<div class="likeBox hidden"><i class="fa-solid fa-thumbs-up"></i><span class="likePrefix"></span><span class="likeCount hidden">0</span><span class="likeSuffix"></span></div>
			<small>Like &#8226; Comment &#8226; Share
		`;
        let list = document.getElementById("friendSpaceFeed");
        if (document.querySelector(`.appContainer[data-app="friendSpaceApp"]`).classList.contains('hidden')) {
            if (document.getElementById("oldPostsHeader")) {
                list.insertBefore(newItem, list.childNodes[0]);
            }
            else {
                let oldPostHeader = document.createElement("LI");
                oldPostHeader.id = "oldPostsHeader";
                oldPostHeader.innerHTML = `<h3>Older Posts</h3>`;
                list.insertBefore(oldPostHeader, list.childNodes[0]);
                list.insertBefore(newItem, list.childNodes[0]);
            }
        }
        else {
            list.insertBefore(newItem, list.childNodes[0]);
        }
    }
    Social.updateFriendSpaceFeed = updateFriendSpaceFeed;
})(Social || (Social = {}));
