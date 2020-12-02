import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

function calculateUptime(uptime: number): string {
  const seconds = Math.floor(uptime);
  const hours = Math.floor(seconds / 60);
  const minutes = Math.floor(hours / 60);

  return `${hours}h ${minutes}min ${seconds}s`;
}

routes.get('/healthcheck', (request, response) => {
  return response.json({
    uptime: calculateUptime(process.uptime()),
  });
});

export default routes;
