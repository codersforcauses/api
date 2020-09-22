// events-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import mongoose from "mongoose";
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "events";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: {
        type: String,
        maxLength: 128,
        index: true,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        maxLength: 2048,
        trim: true,
        required: true,
      },
      // TODO: need to come back to this after mapbox api is finalised
      venue: {
        type: Object,
        required: true,
      },
      times: [
        {
          from: {
            type: Date,
            required: true,
            index: true,
          },
          to: {
            type: Date,
            required: true,
            index: true,
          },
        },
      ],
      requirements: [{ type: String, maxLength: 128, trim: true }],
      imageLinks: [String],
      type: [
        {
          type: String,
          enum: ["workshop", "industry_night", "other"],
          default: "other",
        },
      ],
      price: {
        member: { type: Number, default: 0 },
        nonMember: { type: Number, default: 0 },
      },
      users: [{ type: mongoose.Schema.Types.ObjectId }],
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
