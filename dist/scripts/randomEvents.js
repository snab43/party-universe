"use strict";
var randomEvents;
(function (randomEvents) {
    function friendSpacePost(militaryTime) {
        if (Math.random() <= 1 / 100) {
            Social.updateFriendSpaceFeed(chance.name(), chance.city() + ", " + chance.country(), DIALOGUE_FRIENDSPACE_POST[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_POST.length)], militaryTime);
            UI.appNotification("friendSpaceApp");
        }
        if (Math.random() <= 1 / 500) {
            Social.updateFriendSpaceFeed("Advertisement", "Sponsored", DIALOGUE_FRIENDSPACE_AD[Math.floor(Math.random() * DIALOGUE_FRIENDSPACE_AD.length)], militaryTime);
            UI.appNotification("friendSpaceApp");
        }
    }
    randomEvents.friendSpacePost = friendSpacePost;
    function textMessage(partyGoers, militaryTime) {
        if (Math.random() <= 1 / 75) {
            Social.updateTextMessage(partyGoers[Math.floor(Math.random() * (partyGoers.length))], DIALOGUE_PARTY_GOER_TEXT[Math.floor(Math.random() * DIALOGUE_PARTY_GOER_TEXT.length)], "partyGoerMessage", militaryTime);
            UI.appNotification("messagesApp");
        }
        if (Math.random() <= 1 / 250) {
            Social.updateTextMessage(chance.name(), DIALOGUE_TEXT_MESSAGE[Math.floor(Math.random() * DIALOGUE_TEXT_MESSAGE.length)], "defaultMessage", militaryTime);
            UI.appNotification("messagesApp");
        }
        if (Math.random() <= 1 / 800) {
            Social.updateTextMessage("Unknown", DIALOGUE_WRONG_NUMBER[Math.floor(Math.random() * DIALOGUE_WRONG_NUMBER.length)], "defaultMessage", militaryTime);
            UI.appNotification("messagesApp");
        }
    }
    randomEvents.textMessage = textMessage;
})(randomEvents || (randomEvents = {}));
