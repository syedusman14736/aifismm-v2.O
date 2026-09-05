const ORDERS = [
    {
        id: "ORD-10001",
        service: "Instagram Followers | High Quality",
        platform: "Instagram",
        category: "Refill",
        serviceType: "Followers",

        link: "https://instagram.com/example",
        quantity: 1000,
        startCount: 12500,
        remains: 0,

        charge: 250,
        currency: "PKR",

        status: "Completed",

        refill: {
            enabled: true,
            duration: "30 Days",
        },

        createdAt: "2026-09-03T10:30:00",
        completedAt: "2026-09-03T11:45:00",
    },

    {
        id: "ORD-10002",
        service: "Instagram Likes | Premium",
        platform: "Instagram",
        category: "Cheap",
        serviceType: "Likes",

        link: "https://instagram.com/p/example",
        quantity: 5000,
        startCount: 3400,
        remains: 2800,

        charge: 100,
        currency: "PKR",

        status: "In Progress",

        refill: {
            enabled: false,
            duration: null,
        },

        createdAt: "2026-09-03T12:15:00",
        completedAt: null,
    },

    {
        id: "ORD-10003",
        service: "TikTok Followers | Lifetime Refill",
        platform: "TikTok",
        category: "Refill",
        serviceType: "Followers",

        link: "https://tiktok.com/@example",
        quantity: 2500,
        startCount: 8200,
        remains: 1200,

        charge: 500,
        currency: "PKR",

        status: "Partial",

        refill: {
            enabled: true,
            duration: "Lifetime",
        },

        createdAt: "2026-09-02T16:20:00",
        completedAt: null,
    },

    {
        id: "ORD-10004",
        service: "YouTube Views | Cheap",
        platform: "YouTube",
        category: "Cheap",
        serviceType: "Views",

        link: "https://youtube.com/watch?v=example",
        quantity: 10000,
        startCount: 15000,
        remains: 10000,

        charge: 150,
        currency: "PKR",

        status: "Pending",

        refill: {
            enabled: false,
            duration: null,
        },

        createdAt: "2026-09-02T14:10:00",
        completedAt: null,
    },

    {
        id: "ORD-10005",
        service: "Facebook Page Likes | Premium",
        platform: "Facebook",
        category: "Refund",
        serviceType: "Likes",

        link: "https://facebook.com/example",
        quantity: 1000,
        startCount: 5000,
        remains: 1000,

        charge: 300,
        currency: "PKR",

        status: "Canceled",

        refill: {
            enabled: false,
            duration: null,
        },

        createdAt: "2026-09-01T18:45:00",
        completedAt: null,
    },

    {
        id: "ORD-10006",
        service: "Instagram Story Views",
        platform: "Instagram",
        category: "Cheap",
        serviceType: "Views",

        link: "https://instagram.com/stories/example",
        quantity: 3000,
        startCount: 1200,
        remains: 0,

        charge: 90,
        currency: "PKR",

        status: "Completed",

        refill: {
            enabled: false,
            duration: null,
        },

        createdAt: "2026-09-01T11:30:00",
        completedAt: "2026-09-01T12:10:00",
    },

    {
        id: "ORD-10007",
        service: "TikTok Likes | Refill",
        platform: "TikTok",
        category: "Refill",
        serviceType: "Likes",

        link: "https://tiktok.com/@example/video/123",
        quantity: 5000,
        startCount: 700,
        remains: 3200,

        charge: 275,
        currency: "PKR",

        status: "In Progress",

        refill: {
            enabled: true,
            duration: "30 Days",
        },

        createdAt: "2026-08-31T20:15:00",
        completedAt: null,
    },

    {
        id: "ORD-10008",
        service: "YouTube Subscribers",
        platform: "YouTube",
        category: "Refund",
        serviceType: "Subscribers",

        link: "https://youtube.com/@example",
        quantity: 500,
        startCount: 2400,
        remains: 500,

        charge: 450,
        currency: "PKR",

        status: "Refunded",

        refill: {
            enabled: false,
            duration: null,
        },

        createdAt: "2026-08-30T13:25:00",
        completedAt: null,
    },
];

export default ORDERS;