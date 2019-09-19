var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var receptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    cname: {
      type: String
    },
    phone: {
      type: String,
      minLength: 10,
      maxLength: 12
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    about: {
      type: String,
      default: "Please Update about yourself"
    },
    expectations: {
      type: String,
      default: "What to you expect from the event ?"
    },
    status: {
      type: String,
      enum: ["Not processed", "Finalized"],
      default: "Not processed"
    }
  },
  {
    timestamps: true
  }
);

var Reception = mongoose.model("Reception", receptionSchema);

module.exports = Reception;
