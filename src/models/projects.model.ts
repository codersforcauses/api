// projects-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import mongoose from "mongoose";
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "projects";
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
      type: [
        {
          type: String,
          enum: ["web", "mobile_app", "desktop_app"],
          default: "web",
          index: true,
        },
      ],
      client: [
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
          email: {
            type: String,
            match: "^.+@.+\\..+$",
            maxLength: 128,
            index: true,
            trim: true,
            lowercase: true,
            required: true,
          },
        },
      ],
      startDate: {
        type: Date,
        required: true,
        index: true,
      },
      imageLinks: [String],
      impact: [{ type: String, maxLength: 256, trim: true }],
      links: [
        {
          type: {
            type: String,
            enum: [
              "github",
              "gitlab",
              "bitbucket",
              "app_store",
              "play_store",
              "website",
            ],
          },
          link: {
            type: String,
            maxLength: 256,
            trim: true,
          },
        },
      ],
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
