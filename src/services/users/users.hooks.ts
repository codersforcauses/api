import { HookContext } from '@feathersjs/feathers'
import userJwt from './hooks/user-jwt'

export default {
  before: {
    all: [],
    find: [],
    get: [userJwt()],
    create: [
      (context: HookContext) => {
        if (context.params.provider === 'rest') {
          // will need to update this when payments are available
          context.data.roles = ['member']
        } else {
          context.data.roles = ['test']
        }
        return context
      }
    ],
    update: [userJwt()],
    patch: [userJwt()],
    remove: [userJwt()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
