"use strict";
const TEXT_COST = 0.25;
const GAME_VERSION = '0.0.3';
const FOOD_STATS = [
    {
        id: "nachos",
        name: "Nachos",
        cost: 5,
        genderWeight: [-1],
        speciesWeight: ["human"],
        ageWeight: ["child", "adolescent", "adult"],
        tribeWeight: ["everyman"]
    },
    {
        id: "hotdog",
        name: "Hotdog",
        cost: 7,
        genderWeight: [0, 0.1, 0.2, 0.3],
        speciesWeight: ["human"],
        ageWeight: ["child", "adolescent"],
        tribeWeight: ["everyman", "jester"]
    },
    {
        id: "deviledEgg",
        name: "Deviled Egg",
        cost: 15,
        genderWeight: [1, 0.9, 0.8],
        speciesWeight: ["human"],
        ageWeight: ["senior"],
        tribeWeight: ["everyman", "caregiver"]
    },
    {
        id: "chickenNugget",
        name: "Chicken Nugget",
        cost: 25,
        genderWeight: [0, 0.1, 0.2],
        speciesWeight: ["human"],
        ageWeight: ["child"],
        tribeWeight: ["rebel"]
    },
    {
        id: "hummus",
        name: "Hummus",
        cost: 40,
        genderWeight: [-1],
        speciesWeight: ["human"],
        ageWeight: ["adult"],
        tribeWeight: ["artist"]
    }
];
const DRINK_STATS = [
    {
        id: "water",
        name: "Water",
        cost: 1,
        genderWeight: [-1],
        speciesWeight: ["none"],
        ageWeight: ["none"],
        tribeWeight: ["none"]
    },
    {
        id: "soda",
        name: "Soda",
        cost: 5,
        genderWeight: [0, 0.1, 0.2],
        speciesWeight: ["human"],
        ageWeight: ["child", "adolescent"],
        tribeWeight: ["everyman", "jester"]
    },
    {
        id: "milk",
        name: "Milk",
        cost: 15,
        genderWeight: [-1],
        speciesWeight: ["human", "cat"],
        ageWeight: ["child"],
        tribeWeight: ["everyman", "leader", "caregiver"]
    },
    {
        id: "blood",
        name: "Blood",
        cost: 1000,
        genderWeight: [-1],
        speciesWeight: ["vampire"],
        ageWeight: ["none"],
        tribeWeight: ["rebel"]
    }
];
const DECORATION_STATS = [
    {
        id: "balloon",
        name: "Balloon",
        cost: 0.25,
        genderWeight: [-1],
        speciesWeight: ["none"],
        ageWeight: ["none"],
        tribeWeight: ["none"]
    }
];
const ACTIVITY_STATS = [
    {
        id: "cards",
        name: "Cards",
        cost: 3,
        genderWeight: [-1],
        speciesWeight: ["none"],
        ageWeight: ["none"],
        tribeWeight: ["none"]
    }
];
const PROMOTION_STATS = [
    {
        id: "friendSpaceAd",
        name: "FriendSpace Ad",
        cost: 100,
        costPerTick: 2,
        genderWeight: [-1],
        speciesWeight: ["none"],
        ageWeight: ["none"],
        tribeWeight: ["none"]
    }
];
const VENUE_STATS = [
    {
        id: "basement",
        name: "Basement",
        capacity: 50,
        cost: 2000,
        rent: 5,
        genderWeight: [-1],
        speciesWeight: ["none"],
        ageWeight: ["none"],
        tribeWeight: ["none"]
    }
];
