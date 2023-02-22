const DEFAULT_SUPPLIES = {
    100: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    101: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    102: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    103: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    104: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    105: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    106: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    107: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    }
};
const DEFAULT_DRINKS = {
    200: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    201: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    202: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    203: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    204: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    205: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    206: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    },
    207: {
        amount: 0,
        amountMod: 1,
        costMod: 1
    }
};
const DEFAULT_PROMOTIONS = {
    300: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    },
    301: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    },
    302: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    },
    303: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    },
    304: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    },
    305: {
        amount: 0,
        currentDuration: 0,
        amountMod: 1,
        costMod: 1,
        durationMod: 1,
        pullMod: 1
    }
};
const DEFAULT_VENUES = {
    400: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    401: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    402: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    403: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    404: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    405: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    },
    406: {
        amount: 0,
        amountMod: 1,
        costMod: 1,
        capacityMod: 1
    }
};
export class SaveFile {
    constructor() {
        if (localStorage.getItem("partyUniverseSave")) {
            let partyUniverseSave = JSON.parse(localStorage.getItem("partyUniverseSave"));
            this.party = partyUniverseSave.party;
            this.partyCapacity = partyUniverseSave.partyCapacity;
            this.money = partyUniverseSave.money;
            this.totalMoney = partyUniverseSave.totalMoney;
            this.doorFee = partyUniverseSave.doorFee;
            this.clout = partyUniverseSave.clout;
            this.lit = partyUniverseSave.lit;
            this.swag = partyUniverseSave.swag;
            this.pull = partyUniverseSave.pull;
            this.karma = partyUniverseSave.karma;
            this.luck = partyUniverseSave.luck;
            this.digForChangeMod = partyUniverseSave.digForChangeMod;
            this.inviteMod = partyUniverseSave.inviteMod;
            this.supplies = partyUniverseSave.supplies;
            this.drinks = partyUniverseSave.drinks;
            this.promotions = partyUniverseSave.promotions;
            this.venues = partyUniverseSave.venues;
            this.militaryTime = partyUniverseSave.militaryTime;
            this.phoneBackgroundImage = partyUniverseSave.phoneBackgroundImage;
            this.partyGoers = partyUniverseSave.partyGoers;
        }
        else {
            this.party = 1;
            this.partyCapacity = 100;
            this.money = 0;
            this.totalMoney = 0;
            this.doorFee = 0;
            this.clout = 0;
            this.lit = 0;
            this.swag = 0;
            this.pull = 0;
            this.karma = 0;
            this.luck = 0;
            this.digForChangeMod = 0;
            this.inviteMod = 1;
            this.supplies = DEFAULT_SUPPLIES;
            this.drinks = DEFAULT_DRINKS;
            this.promotions = DEFAULT_PROMOTIONS;
            this.venues = DEFAULT_VENUES;
            this.militaryTime = false;
            this.phoneBackgroundImage = '';
            this.partyGoers = ['You'];
        }
    }
    getSaveObject() {
        return {
            party: this.party,
            partyCapacity: this.partyCapacity,
            money: this.money,
            totalMoney: this.totalMoney,
            doorFee: this.doorFee,
            clout: this.clout,
            lit: this.lit,
            swag: this.swag,
            pull: this.pull,
            karma: this.karma,
            luck: this.luck,
            digForChangeMod: this.digForChangeMod,
            inviteMod: this.inviteMod,
            supplies: this.supplies,
            drinks: this.drinks,
            promotions: this.promotions,
            venues: this.venues,
            militaryTime: this.militaryTime,
            phoneBackgroundImage: this.phoneBackgroundImage,
            partyGoers: this.partyGoers
        };
    }
    loadSave() {
        if (localStorage.getItem("partyUniverseSave")) {
            let partyUniverseSave = JSON.parse(localStorage.getItem("partyUniverseSave"));
            this.party = partyUniverseSave.party;
            this.partyCapacity = partyUniverseSave.partyCapacity;
            this.money = partyUniverseSave.money;
            this.totalMoney = partyUniverseSave.totalMoney;
            this.doorFee = partyUniverseSave.doorFee;
            this.clout = partyUniverseSave.clout;
            this.lit = partyUniverseSave.lit;
            this.swag = partyUniverseSave.swag;
            this.pull = partyUniverseSave.pull;
            this.karma = partyUniverseSave.karma;
            this.luck = partyUniverseSave.luck;
            this.digForChangeMod = partyUniverseSave.digForChangeMod;
            this.inviteMod = partyUniverseSave.inviteMod;
            this.supplies = partyUniverseSave.supplies;
            this.drinks = partyUniverseSave.drinks;
            this.promotions = partyUniverseSave.promotions;
            this.venues = partyUniverseSave.venues;
            this.militaryTime = partyUniverseSave.militaryTime;
            this.phoneBackgroundImage = partyUniverseSave.phoneBackgroundImage;
            this.partyGoers = partyUniverseSave.partyGoers;
        }
        else {
            console.log("No save file found.");
        }
    }
    writeSave() {
        localStorage.setItem("partyUniverseSave", JSON.stringify(this.getSaveObject()));
    }
    deleteSave() {
        localStorage.removeItem("partyUniverseSave");
        this.constructor();
    }
}
export default SaveFile;
