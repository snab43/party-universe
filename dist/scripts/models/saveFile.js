export class SaveFile {
    constructor() {
        this.name = 'You';
        this.partyName = 'The Party';
        this.gender = -1;
        this.age = "none";
        this.tribe = "none";
        this.party = 0;
        this.partyCapacity = 50;
        this.money = 0;
        this.doorFee = 0;
        this.karma = 1;
        this.luck = 1;
        this.digForChangeMod = 1;
        this.inviteMod = 1;
        this.food = [];
        this.drinks = [];
        this.decorations = [];
        this.activities = [];
        this.promotions = [];
        this.venues = [];
        this.militaryTime = false;
        this.phoneBackgroundImage = '';
        this.partyGoers = [];
        this.genderDemographic = [];
        this.speciesDemographic = [];
        this.ageDemographic = [];
        this.tribeDemographic = [];
        this.totalMoney = 0;
        this.totalParty = 0;
        this.totalKicked = 0;
        if (localStorage.getItem("partyUniverseSave")) {
            let save = JSON.parse(localStorage.getItem("partyUniverseSave"));
            this.name = save.name;
            this.partyName = save.partyName;
            this.gender = save.gender;
            this.age = save.age;
            this.tribe = save.tribe;
            this.party = save.party;
            this.partyCapacity = save.partyCapacity;
            this.money = save.money;
            this.doorFee = save.doorFee;
            this.karma = save.karma;
            this.luck = save.luck;
            this.digForChangeMod = save.digForChangeMod;
            this.inviteMod = save.inviteMod;
            this.food = save.food;
            this.drinks = save.drinks;
            this.decorations = save.decorations;
            this.activities = save.activities;
            this.promotions = save.promotions;
            this.venues = save.venues;
            this.militaryTime = save.militaryTime;
            this.phoneBackgroundImage = save.phoneBackgroundImage;
            this.partyGoers = save.partyGoers;
            this.genderDemographic = save.genderDemographic;
            this.speciesDemographic = save.speciesDemographic;
            this.ageDemographic = save.ageDemographic;
            this.tribeDemographic = save.tribeDemographic;
            this.totalMoney = save.totalMoney;
            this.totalParty = save.totalParty;
            this.totalKicked = save.totalKicked;
        }
    }
    getSaveObject() {
        return {
            name: this.name,
            partyName: this.partyName,
            gender: this.gender,
            age: this.age,
            tribe: this.tribe,
            party: this.party,
            partyCapacity: this.partyCapacity,
            money: this.money,
            doorFee: this.doorFee,
            karma: this.karma,
            luck: this.luck,
            digForChangeMod: this.digForChangeMod,
            inviteMod: this.inviteMod,
            food: this.food,
            drinks: this.drinks,
            decorations: this.decorations,
            activities: this.activities,
            promotions: this.promotions,
            venues: this.venues,
            militaryTime: this.militaryTime,
            phoneBackgroundImage: this.phoneBackgroundImage,
            partyGoers: this.partyGoers,
            genderDemographic: this.genderDemographic,
            speciesDemographic: this.speciesDemographic,
            ageDemographic: this.ageDemographic,
            tribeDemographic: this.tribeDemographic,
            totalMoney: this.totalMoney,
            totalParty: this.totalParty,
            totalKicked: this.totalKicked
        };
    }
    loadSave() {
        if (localStorage.getItem("partyUniverseSave")) {
            let save = JSON.parse(localStorage.getItem("partyUniverseSave"));
            this.name = save.name;
            this.partyName = save.partyName;
            this.gender = save.gender;
            this.age = save.age;
            this.tribe = save.tribe;
            this.party = save.party;
            this.partyCapacity = save.partyCapacity;
            this.money = save.money;
            this.doorFee = save.doorFee;
            this.karma = save.karma;
            this.luck = save.luck;
            this.digForChangeMod = save.digForChangeMod;
            this.inviteMod = save.inviteMod;
            this.food = save.food;
            this.drinks = save.drinks;
            this.decorations = save.decorations;
            this.activities = save.activities;
            this.promotions = save.promotions;
            this.venues = save.venues;
            this.militaryTime = save.militaryTime;
            this.phoneBackgroundImage = save.phoneBackgroundImage;
            this.partyGoers = save.partyGoers;
            this.genderDemographic = save.genderDemographic;
            this.speciesDemographic = save.speciesDemographic;
            this.ageDemographic = save.ageDemographic;
            this.tribeDemographic = save.tribeDemographic;
            this.totalMoney = save.totalMoney;
            this.totalParty = save.totalParty;
            this.totalKicked = save.totalKicked;
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
    }
}
export default SaveFile;
