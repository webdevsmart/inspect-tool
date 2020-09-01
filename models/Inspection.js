const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const InspectionSchema = new Schema({
  photos: {
    type: Object,
  },
  vehicle_details: {
    type: Object,
  },
  owner_details: {
    type: Object,
  },
  engine_compartment: {
    type: Object
  },
  transmission: {
    type: Object
  },
  brake_system: {
    type: Object
  },
  electrical_controls: {
    type: Object,
  },
  front_suspension: {
    type: Object,
  },
  rear_suspension: {
    type: Object,
  },
  exhaust_system: {
    type: Object,
  },
  body_interior: {
    type: Object,
  },
  body_exterior: {
    type: Object,
  },
  underbody: {
    type: Object,
  },
  tyres: {
    type: Object,
  },
  road_test: {
    type: Object,
  },
  date: {
    type: Date,
    default: new Date(),
  }
});

module.exports = Inspection = mongoose.model("inspection", InspectionSchema);
