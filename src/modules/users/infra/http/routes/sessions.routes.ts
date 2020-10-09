import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticaceUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);
  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });
  const mappedUser = user.toDTO(user);

  return response.status(200).json({ mappedUser, token });

  return response.status(400).send();
});

export default sessionsRouter;
