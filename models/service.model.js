const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    openingTimes: {
      type: String,
      required: true,
      trim: true,
    },

    lat: {
      type: Number,
    },

    lng: {
      type: Number,
    },

    isFree: {
      type: Boolean,
      default: true,
    },

    hasWifi: {
      type: Boolean,
      default: false,
    },

    hasPrinter: {
      type: Boolean,
      default: false,
    },

    hasToilets: {
      type: Boolean,
      default: false,
    },

    hasStepFreeAccess: {
      type: Boolean,
      default: false,
    },

    accessibilityNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

const Service = mongoose.model('Service', serviceSchema)

module.exports = { Service }
