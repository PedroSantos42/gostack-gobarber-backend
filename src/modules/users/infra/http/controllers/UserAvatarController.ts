import { Request, Response } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const diskStorageProvider = new DiskStorageProvider();

    const updateAvatar = new UpdateUserAvatarService(
      usersRepository,
      diskStorageProvider,
    );

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const mappedUser = user.toDTO(user);

    return response.json({ mappedUser });
  }
}
