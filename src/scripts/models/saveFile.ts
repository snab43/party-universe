// =============================================================
// gameData.ts
// -------------------------------------------------------------
// All the games data that's variable and can be changed. Also
// seen as the save data.
// =============================================================

export class SaveFile {
	// Info
	name: string = 'You';
	partyName: string = 'The Party';
	gender: number = Gender.None;
	age: string = Age.None;
	tribe: string = Tribe.None;

	// Stats
	party: number = 0;
	partyCapacity: number = 50;
	money: number = 0;
	doorFee: number = 0;
	karma: number = 1;
	luck: number = 1;

	// Modifiers
	digForChangeMod: number = 1;
	inviteMod: number = 1;

	// Inventory
	food: [string, number][] = [];
	drinks: [string, number][] = [];
	decorations: [string, number][] = [];
	activities: [string, number][] = [];
	promotions: [string, number][] = [];
	venues: [string, number][] = [];

	// Settings
	militaryTime: boolean = false;
	phoneBackgroundImage: string = '';

	// Party
	partyGoers: string[] = [];
	genderDemographic: [number, number][] = [];
	speciesDemographic: [string, number][] = [];
	ageDemographic: [string, number][] = [];
	tribeDemographic: [string, number][] = [];

	// Total Stats
	totalMoney: number = 0;
	totalParty: number = 100;
	totalKicked: number = 0;

	// Achievements
	// TODO

	constructor() {
		if (localStorage.getItem("partyUniverseSave")) {
			let save: any = JSON.parse(<string>localStorage.getItem("partyUniverseSave"));

			// Info
			this.name = save.name;
			this.partyName = save.partyName;
			this.gender = save.gender;
			this.age = save.age;
			this.tribe = save.tribe;

			// Stats
			this.party = save.party;
			this.partyCapacity = save.partyCapacity;
			this.money = save.money;
			this.doorFee = save.doorFee;
			this.karma = save.karma;
			this.luck = save.luck;

			// Modifiers
			this.digForChangeMod = save.digForChangeMod;
			this.inviteMod = save.inviteMod;

			// Inventory
			this.food = save.food;
			this.drinks = save.drinks;
			this.decorations = save.decorations;
			this.activities = save.activities;
			this.promotions = save.promotions;
			this.venues = save.venues;

			// Settings
			this.militaryTime = save.militaryTime;
			this.phoneBackgroundImage = save.phoneBackgroundImage;

			// Party
			this.partyGoers = save.partyGoers;
			this.genderDemographic = save.genderDemographic;
			this.speciesDemographic = save.speciesDemographic;
			this.ageDemographic = save.ageDemographic;
			this.tribeDemographic = save.tribeDemographic;

			// Total Stats
			this.totalMoney = save.totalMoney;
			this.totalParty = save.totalParty;
			this.totalKicked = save.totalKicked;
		}
	}

	getSaveObject (): object {
		return {
			// Info
			name: this.name,
			partyName: this.partyName,
			gender: this.gender,
			age: this.age,
			tribe: this.tribe,

			// Stats
			party: this.party,
			partyCapacity: this.partyCapacity,
			money: this.money,
			doorFee: this.doorFee,
			karma: this.karma,
			luck: this.luck,

			// Modifiers
			digForChangeMod: this.digForChangeMod,
			inviteMod: this.inviteMod,

			// Inventory
			food: this.food,
			drinks: this.drinks,
			decorations: this.decorations,
			activities: this.activities,
			promotions: this.promotions,
			venues: this.venues,

			// Settings
			militaryTime: this.militaryTime,
			phoneBackgroundImage: this.phoneBackgroundImage,

			// Party
			partyGoers: this.partyGoers,
			genderDemographic: this.genderDemographic,
			speciesDemographic: this.speciesDemographic,
			ageDemographic: this.ageDemographic,
			tribeDemographic: this.tribeDemographic,

			// Total Stats
			totalMoney: this.totalMoney,
			totalParty: this.totalParty,
			totalKicked: this.totalKicked
		};
	}

	loadSave(): void {
		if (localStorage.getItem("partyUniverseSave")) {
			let save: any = JSON.parse(<string>localStorage.getItem("partyUniverseSave"));

			// Info
			this.name = save.name;
			this.partyName = save.partyName;
			this.gender = save.gender;
			this.age = save.age;
			this.tribe = save.tribe;

			// Stats
			this.party = save.party;
			this.partyCapacity = save.partyCapacity;
			this.money = save.money;
			this.doorFee = save.doorFee;
			this.karma = save.karma;
			this.luck = save.luck;

			// Modifiers
			this.digForChangeMod = save.digForChangeMod;
			this.inviteMod = save.inviteMod;

			// Inventory
			this.food = save.food;
			this.drinks = save.drinks;
			this.decorations = save.decorations;
			this.activities = save.activities;
			this.promotions = save.promotions;
			this.venues = save.venues;

			// Settings
			this.militaryTime = save.militaryTime;
			this.phoneBackgroundImage = save.phoneBackgroundImage;

			// Party
			this.partyGoers = save.partyGoers;
			this.genderDemographic = save.genderDemographic;
			this.speciesDemographic = save.speciesDemographic;
			this.ageDemographic = save.ageDemographic;
			this.tribeDemographic = save.tribeDemographic;

			// Total Stats
			this.totalMoney = save.totalMoney;
			this.totalParty = save.totalParty;
			this.totalKicked = save.totalKicked;
		} else {
			console.log("No save file found.");
		}
	}

	writeSave (): void {
		localStorage.setItem("partyUniverseSave", JSON.stringify(this.getSaveObject()))
	}

	deleteSave (): void {
		localStorage.removeItem("partyUniverseSave");
	}
}

export default SaveFile;