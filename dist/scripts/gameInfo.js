"use strict";
const ITEM_STATS = {
    supplies: {
        100: {
            id: "balloon",
            name: "Balloon",
            description: "Every party has to have balloons, right?",
            cost: 0.25,
            lit: 0,
            swag: -2
        },
        101: {
            id: "snack",
            name: "Snack",
            description: "Just your generic looking snack.",
            cost: 10,
            lit: -2,
            swag: 0
        },
        102: {
            id: "sodaPongTable",
            name: "Soda Pong Table",
            description: "Try playing doubles!",
            cost: 50,
            lit: 5,
            swag: 2
        },
        103: {
            id: "strobeLight",
            name: "Strobe Light",
            description: "I think I'm gonna be sick...",
            cost: 150,
            lit: 25,
            swag: 10
        },
        104: {
            id: "djEquipment",
            name: "DJ Equipment",
            description: "Play freebird (dubstep remix)!",
            cost: 600,
            lit: 30,
            swag: 20
        },
        105: {
            id: "televisionSet",
            name: "Television Set",
            description: "What channel's the game?",
            cost: 1500,
            lit: 10,
            swag: 10
        },
        106: {
            id: "bounceHouse",
            name: "Bounce House",
            description: "Pairs really well with some booze.",
            cost: 4000,
            lit: 50,
            swag: 0
        },
        107: {
            id: "tiger",
            name: "Tiger",
            description: "Be careful, he bites.",
            cost: 20000,
            lit: 100,
            swag: 200
        }
    },
    drinks: {
        200: {
            id: "tapWater",
            name: "Tap Water",
            description: "It's an essential part of life, and a party (also it's basically free).",
            cost: 0.01,
            lit: 1,
            swag: 1
        },
        201: {
            id: "bottledWater",
            name: "Bottled Water",
            description: "Straight from the mountains.",
            cost: 4,
            lit: 2,
            swag: 1
        },
        202: {
            id: "soda",
            name: "Soda",
            description: "Don't drink your calories.",
            cost: 12,
            lit: 1,
            swag: 5
        },
        203: {
            id: "dietSoda",
            name: "Diet Soda",
            description: "Now we can drink all the soda we want!",
            cost: 30,
            lit: 20,
            swag: 3
        },
        204: {
            id: "rootBeer",
            name: "Root Beer",
            description: "Let's not get too crazy here.",
            cost: 100,
            lit: 5,
            swag: 1
        },
        205: {
            id: "milk",
            name: "Milk",
            description: "You wouldn't think it, but milk is an essential part of all parties.",
            cost: 250,
            lit: 100,
            swag: 1
        },
        206: {
            id: "sparklingWater",
            name: "Sparkling Water",
            description: "All class.",
            cost: 1000,
            lit: 15,
            swag: 50
        },
        207: {
            id: "liquidMeteroite",
            name: "Liquid Meteorite",
            description: "Who in this world would drink this stuff?",
            cost: 50000,
            lit: 100,
            swag: 100
        }
    },
    promotions: {
        300: {
            id: "friendSpaceAd",
            name: "FriendSpace Ad",
            description: "Guaranteed to get you clicks.",
            cost: 100,
            duration: 7200,
            pull: 5
        },
        301: {
            id: "sponsoredPost",
            name: "Sponsored Post",
            description: "Influencers love to promote parties.",
            cost: 500,
            duration: 3600,
            pull: 10
        },
        302: {
            id: "hireADJ",
            name: "Hire a DJ",
            description: "You need someone spinning the best hits for a party.",
            cost: 2000,
            duration: 1800,
            pull: 50
        },
        303: {
            id: "hireABand",
            name: "Hire a Band",
            description: "Hope you don't mind them selling merch at the front door.",
            cost: 8000,
            duration: 1200,
            pull: 80
        },
        304: {
            id: "celebrityGuestAppearance",
            name: "Celebrity Guest Appearance",
            description: "They don't stay long, but the pull is insane.",
            cost: 50000,
            duration: 300,
            pull: 300
        },
        305: {
            id: "satelliteSignal",
            name: "Satellite Signal",
            description: "I want to believe",
            cost: 10000000,
            duration: 60,
            pull: 1
        }
    },
    venues: {
        400: {
            id: "house",
            name: "House",
            description: "Two stories for more party room!",
            cost: 5000,
            capacity: 100,
            rent: 5,
            swag: 1
        },
        401: {
            id: "mansion",
            name: "Mansion",
            description: "Now we're getting classy.",
            cost: 10000,
            capacity: 300,
            rent: 50,
            swag: 30
        },
        402: {
            id: "yacht",
            name: "Yacht",
            description: "All about the S.S. Party!",
            cost: 25000,
            capacity: 800,
            rent: 300,
            swag: 50
        },
        403: {
            id: "warehouse",
            name: "Warehouse",
            description: "It's kinda sketch, but you can fit a lot of people in.",
            cost: 40000,
            capacity: 2000,
            rent: 200,
            swag: -30
        },
        404: {
            id: "airplaneHangar",
            name: "Airplane Hangar",
            description: "Now we really have space to party!",
            cost: 100000,
            capacity: 10000,
            rent: 500,
            swag: 5
        },
        405: {
            id: "country",
            name: "Country",
            description: "I didn't know you could buy a country, just like that.",
            cost: 1000000,
            capacity: 500000,
            rent: 4000,
            swag: 100
        },
        406: {
            id: "planet",
            name: "Planet",
            description: "Party universe!",
            cost: 500000000,
            capacity: 8000000000,
            rent: 0,
            swag: 50000
        }
    }
};
