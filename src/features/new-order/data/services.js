import mongoose from "mongoose";

// ==========================================
// SERVICE SCHEMA
// ==========================================

const serviceSchema = new mongoose.Schema(
    {
        // ======================================
        // PROVIDER MAPPING
        // ======================================

        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true,
            index: true,
        },

        providerServiceId: {
            type: String,
            required: true,
            trim: true,
        },

        // ======================================
        // AIFI SERVICE ID
        // ======================================

        serviceId: {
            type: Number,
            unique: true,
            index: true,
        },

        // ======================================
        // SERVICE BASIC INFO
        // ======================================

        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: null,
            trim: true,
        },

        // ======================================
        // AIFI SERVICE TYPE
        // ======================================
        // Example:
        // followers
        // likes
        // views
        // comments
        // shares
        // saves

        type: {
            type: String,
            default: null,
            trim: true,
            lowercase: true,
        },

        // ======================================
        // AIFI PLATFORM
        // ======================================
        // Example:
        // instagram
        // tiktok
        // youtube
        // facebook

        platform: {
            type: String,
            default: null,
            trim: true,
            lowercase: true,
        },

        // ======================================
        // AIFI SERVICE CATEGORY
        // ======================================
        //
        // cheap
        // refill
        // refund

        category: {
            type: String,
            enum: [
                "cheap",
                "refill",
                "refund",
            ],
            default: "cheap",
        },

        // ======================================
        // AIFI SELLING RATE
        // ======================================

        rate: {
            type: Number,
            required: true,
            min: 0,
        },

        // ======================================
        // ORDER LIMITS
        // ======================================

        min: {
            type: Number,
            required: true,
            min: 1,
        },

        max: {
            type: Number,
            required: true,
            min: 1,
        },

        // ======================================
        // AIFI SERVICE INFORMATION
        // ======================================

        speed: {
            type: String,
            default: null,
            trim: true,
        },

        drop: {
            type: String,
            default: null,
            trim: true,
        },

        quality: {
            type: String,
            default: null,
            trim: true,
        },

        // ======================================
        // REFILL
        // ======================================

        refill: {
            enabled: {
                type: Boolean,
                default: false,
            },

            duration: {
                type: String,
                default: null,
            },
        },

        // ======================================
        // REFUND
        // ======================================

        refund: {
            type: Boolean,
            default: false,
        },

        // ======================================
        // PROVIDER INFORMATION
        // ======================================

        providerType: {
            type: String,
            default: null,
            trim: true,
        },

        providerCategory: {
            type: String,
            default: null,
            trim: true,
        },

        providerRate: {
            type: Number,
            required: true,
            min: 0,
        },

        // ======================================
        // PROVIDER CAPABILITIES
        // ======================================

        dripfeed: {
            type: Boolean,
            default: false,
        },

        cancel: {
            type: Boolean,
            default: false,
        },

        // ======================================
        // PROVIDER AVERAGE TIME
        // ======================================

        averageTime: {
            type: Number,
            default: null,
            min: 0,
        },

        // ======================================
        // SERVICE STATUS
        // ======================================

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
            ],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

// ==========================================
// UNIQUE PROVIDER SERVICE
// ==========================================

serviceSchema.index(
    {
        provider: 1,
        providerServiceId: 1,
    },
    {
        unique: true,
    }
);

// ==========================================
// MODEL
// ==========================================

const Service = mongoose.model(
    "Service",
    serviceSchema
);

export default Service;