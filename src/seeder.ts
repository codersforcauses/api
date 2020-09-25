import * as faker from 'faker/locale/en_AU'
import { Application } from './declarations'
import logger from './logger'
import { default as userData } from './users.seed.json'

const DBItems = 5

const createEvent = (seededUsers: Array<{ _id: string }>) => {
  const types = ['workshop', 'social', 'industry_night', 'other']
  const events = []

  for (let i = 0; i < DBItems; i++) {
    const name = faker.company.companyName()
    const fromDate = faker.date.soon()

    events.push({
      name: name,
      slug: faker.helpers.slugify(name),
      description: faker.lorem.paragraph(),
      venue: [
        {
          name: faker.address.city(),
          location: {
            address: faker.fake(
              '{{address.streetAddress}}, {{address.city}}, WA {{address.zipCode}}, Australia'
            ),
            coordinates: [faker.address.longitude(), faker.address.latitude()]
          }
        }
      ],
      times: [
        {
          from: fromDate,
          to: faker.date.soon(0, fromDate)
        }
      ],
      imageLinks: new Array(faker.random.number(5))
        .fill(0)
        .map(() => faker.image.imageUrl()),
      type: faker.random.arrayElement(types),
      price: {
        member: faker.commerce.price(0, 20),
        nonMember: faker.commerce.price(0, 20)
      },
      members: seededUsers
    })
  }
  return events
}

const createProject = (seededUsers: Array<{ _id: string }>) => {
  const types = ['web', 'mobile_app', 'desktop_app']
  const projects = []

  for (let i = 0; i < DBItems; i++) {
    const name = faker.company.companyName()

    projects.push({
      name: name,
      slug: faker.helpers.slugify(name),
      description: faker.lorem.paragraph(),
      type: faker.random.arrayElement(types),
      client: [
        {
          name: faker.name.findName(),
          description: faker.lorem.paragraph(),
          email: faker.internet.email()
        }
      ],
      startDate: faker.date.soon(),
      endDate: faker.date.future(2),
      imageLinks: new Array(faker.random.number(5))
        .fill(0)
        .map(() => faker.image.imageUrl()),
      impact: new Array(faker.random.number(5))
        .fill(0)
        .map(() => faker.lorem.sentence()),
      tech: new Array(faker.random.number(10))
        .fill(0)
        .map(() => faker.lorem.word(faker.random.number(10))),
      members: seededUsers
    })
  }
  return projects
}

export default async function (app: Application) {
  logger.info('Start seeding data')
  const userService = app.service('users')
  const eventService = app.service('events')
  const projectService = app.service('projects')

  try {
    const { data: usersInDB } = await userService.find()
    const users =
      usersInDB.length === 0
        ? userData.map(user => userService.create(user))
        : []
    await Promise.all(users)

    const { data: seededUsers } = await userService.find({
      query: {
        $select: ['_id']
      }
    })

    // Events
    const { data: eventsInDB } = await eventService.find()
    const events =
      eventsInDB.length === 0
        ? createEvent(seededUsers).map(event => eventService.create(event))
        : []

    // Projects
    const { data: projectsInDB } = await projectService.find()
    const projects =
      projectsInDB.length === 0
        ? createProject(seededUsers).map(project =>
            projectService.create(project)
          )
        : []

    await Promise.all([...events, ...projects])
    logger.info('Finish seeding data')
  } catch (error) {
    logger.error(error)
  }
}
