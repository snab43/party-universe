"use strict";
var Utilities;
(function (Utilities) {
    function calculateClout(party, money) {
        let partySizeCalc = (party) / 100000000 * 0.75;
        let moneySavedCalc = money / 10000000 * 0.25;
        let total = partySizeCalc + moneySavedCalc;
        let bendFactor = 0.1;
        let calculation = -Math.pow((Math.pow(total, bendFactor) - 1), 2) + 1;
        return calculation;
    }
    Utilities.calculateClout = calculateClout;
    function getHourMinuteTimeStamp(militaryTime) {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime;
        if (militaryTime) {
            strTime = hours + ':' + minutes;
        }
        else {
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            strTime = hours + ':' + minutes + ' ' + ampm;
        }
        return strTime;
    }
    Utilities.getHourMinuteTimeStamp = getHourMinuteTimeStamp;
    function statChange(statID, amount) {
        let stat = document.getElementById(statID);
        let statChange = document.createElement("DIV");
        if (statID == "money") {
            statChange.innerText = `$${Math.abs(amount).toFixed(2)}`;
        }
        else {
            statChange.innerText = `${Math.abs(amount)}`;
        }
        stat.parentNode.appendChild(statChange);
        if (amount > 0) {
            statChange.classList.add('statChangeUp');
        }
        else if (amount < 0) {
            statChange.classList.add('statChangeDown');
        }
        else {
            console.log("ERROR: Somehow calculated $0.");
        }
        setTimeout(() => statChange.remove(), 490);
    }
    Utilities.statChange = statChange;
    function cleanNumber(number, decimals) {
        let factor = Math.pow(10, decimals);
        return Math.round((number + Number.EPSILON) * factor) / factor;
    }
    Utilities.cleanNumber = cleanNumber;
})(Utilities || (Utilities = {}));
