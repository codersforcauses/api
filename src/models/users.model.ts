// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import mongoose from 'mongoose'
import { Application } from '../declarations'

export default function (app: Application) {
  const modelName = 'users'
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const schema = new Schema(
    {
      firstName: {
        type: String,
        maxLength: 64,
        index: true,
        trim: true,
        required: true
      },
      lastName: {
        type: String,
        maxLength: 64,
        index: true,
        trim: true,
        required: true
      },
      email: {
        type: String,
        maxLength: 128,
        index: true,
        trim: true,
        lowercase: true,
        required: true,
        unique: true
      },
      signUpType: {
        type: String,
        enum: ['pheme', 'email'],
        default: 'email'
      },
      awsSub: {
        type: String,
        maxLength: 64,
        index: true,
        trim: true,
        required: true,
        unique: true
      },
      isGuildMember: {
        type: Boolean,
        default: false
      },
      bio: {
        type: String,
        maxLength: 512,
        trim: true
      },
      gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        default: 'other'
      },
      dob: Date,
      roles: [
        {
          type: String,
          enum: [
            'admin',
            'test',
            'member',
            'president',
            'vice_president',
            'secretary',
            'treasurer',
            'tech_lead',
            'marketing_officer',
            'ocm',
            'first_year_rep'
          ],
          index: true
        }
      ],
      socials: [
        {
          type: {
            type: String,
            enum: [
              'github',
              'gitlab',
              'bitbucket',
              'facebook',
              'instagram',
              'twitter',
              'linkedin',
              'foursquare',
              'wechat',
              'website',
              'snapchat'
            ]
          },
          username: {
            type: String,
            maxLength: 64,
            trim: true
          },
          link: {
            type: String,
            maxLength: 128,
            trim: true
          }
        }
      ],
      profileImage: {
        img: String,
        hash: String
      },
      isFinancialMember: {
        type: Boolean,
        default: false
      },
      tech: [
        {
          type: String,
          trim: true
        }
      ],
      services: [
        {
          type: {
            type: String,
            enum: ['stripe']
          },
          ref: {
            type: String,
            maxLength: 1024
          },
          updatedAt: Date,
          data: {}
        }
      ]
    },
    {
      timestamps: true
    }
  )

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName)
  }
  return mongooseClient.model(modelName, schema)
}
