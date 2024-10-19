import { Inject, Injectable } from '@nestjs/common';
import { Storage, GetSignedUrlConfig } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoogleCloudStorageService {
  private storage: Storage;
  public bucketName: string;

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('GOOGLE_CLOUD_STORAGE_BUCKET', 'curato-db-dev');
    this.storage = new Storage();
  }

  public getBucketName(): string {
    return this.bucketName;
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;

    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(fileName);

    await blob.save(file.buffer, {
      contentType: file.mimetype,
      resumable: false,
    });

    return fileName;
  }

  async getSignedUrl(fileName: string): Promise<string> {
    const options: GetSignedUrlConfig = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000,
    };

    const [url] = await this.storage.bucket(this.bucketName).file(fileName).getSignedUrl(options);

    return url;
  }
}
