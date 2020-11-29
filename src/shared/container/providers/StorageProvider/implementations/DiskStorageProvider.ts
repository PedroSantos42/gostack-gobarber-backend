import { promises } from 'fs';
import path from 'path';
import storageConfig from '@config/storage';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await promises.rename(
      path.resolve(storageConfig.tmpFolder, file),
      path.resolve(storageConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(storageConfig.uploadsFolder, file);

    try {
      promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
