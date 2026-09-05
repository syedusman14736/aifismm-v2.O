export const SERVICES = [
    // ==========================================
    // INSTAGRAM - CHEAP
    // ==========================================

    {
        id: 1,
        platform: "instagram",
        category: "cheap",

        name: "Instagram Followers",
        type: "followers",

        rate: 20,
        min: 100,
        max: 100000,

        speed: "0-6 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 2,
        platform: "instagram",
        category: "cheap",

        name: "Instagram Likes",
        type: "likes",

        rate: 15,
        min: 100,
        max: 50000,

        speed: "0-4 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 3,
        platform: "instagram",
        category: "cheap",

        name: "Instagram Views",
        type: "views",

        rate: 5,
        min: 100,
        max: 1000000,

        speed: "0-2 Hours",
        drop: "Very Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },


    // ==========================================
    // INSTAGRAM - REFILL
    // ==========================================

    {
        id: 4,
        platform: "instagram",
        category: "refill",

        name: "Instagram Followers - 30 Days Refill",
        type: "followers",

        rate: 45,
        min: 100,
        max: 100000,

        speed: "0-12 Hours",
        drop: "Very Low",
        quality: "High",

        refill: {
            enabled: true,
            duration: "30_days",
        },

        refund: false,
    },


    // ==========================================
    // INSTAGRAM - REFUND
    // ==========================================

    {
        id: 5,
        platform: "instagram",
        category: "refund",

        name: "Instagram Followers - Refill + Refund",
        type: "followers",

        rate: 60,
        min: 100,
        max: 100000,

        speed: "0-12 Hours",
        drop: "Low",
        quality: "Premium",

        refill: {
            enabled: true,
            duration: "30_days",
        },

        refund: true,
    },


    // ==========================================
    // TIKTOK - CHEAP
    // ==========================================

    {
        id: 6,
        platform: "tiktok",
        category: "cheap",

        name: "TikTok Followers",
        type: "followers",

        rate: 25,
        min: 100,
        max: 100000,

        speed: "0-6 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 7,
        platform: "tiktok",
        category: "cheap",

        name: "TikTok Likes",
        type: "likes",

        rate: 10,
        min: 100,
        max: 50000,

        speed: "0-4 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 8,
        platform: "tiktok",
        category: "cheap",

        name: "TikTok Views",
        type: "views",

        rate: 3,
        min: 100,
        max: 1000000,

        speed: "0-2 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },


    // ==========================================
    // YOUTUBE - CHEAP
    // ==========================================

    {
        id: 9,
        platform: "youtube",
        category: "cheap",

        name: "YouTube Views",
        type: "views",

        rate: 30,
        min: 100,
        max: 1000000,

        speed: "0-12 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 10,
        platform: "youtube",
        category: "cheap",

        name: "YouTube Likes",
        type: "likes",

        rate: 40,
        min: 100,
        max: 50000,

        speed: "0-12 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },


    // ==========================================
    // FACEBOOK - CHEAP
    // ==========================================

    {
        id: 11,
        platform: "facebook",
        category: "cheap",

        name: "Facebook Followers",
        type: "followers",

        rate: 20,
        min: 100,
        max: 100000,

        speed: "0-6 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },

    {
        id: 12,
        platform: "facebook",
        category: "cheap",

        name: "Facebook Likes",
        type: "likes",

        rate: 15,
        min: 100,
        max: 50000,

        speed: "0-6 Hours",
        drop: "Low",
        quality: "Good",

        refill: {
            enabled: false,
            duration: null,
        },

        refund: false,
    },
];