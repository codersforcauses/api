import { Application } from '../declarations';
import users from './users/users.service';
import events from './events/events.service';
import projects from './projects/projects.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(events);
  app.configure(projects);
}
