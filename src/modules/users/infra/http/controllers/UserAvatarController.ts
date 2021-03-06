import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
// import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    // const diskStorageProvider = new DiskStorageProvider();
    const s3StorageProvider = new S3StorageProvider();

    const updateAvatar = new UpdateUserAvatarService(
      usersRepository,
      s3StorageProvider,
    );

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json({ user: classToClass(user) });
  }
}
