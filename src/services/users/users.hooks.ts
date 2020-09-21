
import userJwt from '../../hooks/user-jwt';
export default {
  before: {
    all: [],
    find: [],
    get: [userJwt()],
    create: [userJwt()],
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
};
