import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const mappedUser = user.toDTO(user);

    return response.status(201).json(mappedUser);
  }
}
