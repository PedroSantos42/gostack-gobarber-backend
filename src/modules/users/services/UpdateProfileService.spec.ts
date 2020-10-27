import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedName = 'John Tre';
    const updatedEmail = 'johntre@email.com';

    const updatedUser = await fakeUsersRepository.create({
      name: updatedName,
      email: updatedEmail,
      password: '123456',
    });

    expect(updatedUser.name).toBe(updatedName);
    expect(updatedUser.email).toBe(updatedEmail);
  });

  it('should not be able to change the email to an existing one', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: 'john@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedPassword = '123123';

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      old_password: '123456',
      password: updatedPassword,
      name: 'John Doe',
      email: 'john@email.com',
    });

    expect(updatedUser.password).toBe(updatedPassword);
  });

  it('should not be able to update without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedPassword = '123123';

    await expect(
      updateProfile.execute({
        user_id: user.id,
        password: updatedPassword,
        name: 'John Tre',
        email: 'johntre@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@email.com',
      password: '123456',
    });

    const updatedPassword = '123123';

    await expect(
      updateProfile.execute({
        user_id: user.id,
        old_password: 'wrong-old-password',
        password: updatedPassword,
        name: 'John Tre',
        email: 'johntre@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
