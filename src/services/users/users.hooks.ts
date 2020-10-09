import { HookContext } from '@feathersjs/feathers'
import userJwt from '../../hooks/user-jwt'

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
    all: [
      (context: HookContext) => {
        // removes name to response
        const checkNameExists = (user: any) =>
          user.hasOwnProperty('firstName') && user.hasOwnProperty('lastName')
            ? `${user.firstName} ${user.lastName}`
            : undefined

        if (context.result.hasOwnProperty('data')) {
          context.result.data.forEach((user: any) => {
            user.name = checkNameExists(user)
          })
        } else context.result.name = checkNameExists(context.result)
        return context
      }
    ],
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
