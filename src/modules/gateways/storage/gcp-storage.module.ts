import { Global, Module } from '@nestjs/common';
import { GoogleCloudStorageService } from './gcp-storage.service';

@Global()
@Module({
  providers: [GoogleCloudStorageService],
  exports: [GoogleCloudStorageService], // Export the service so other modules can use it
})
export class GoogleCloudStorageModule {}
