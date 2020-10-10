import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticaceUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  const mappedUser = user.toDTO(user);

  return response.status(200).json({ mappedUser, token });

  return response.status(400).send();
});

export default sessionsRouter;
