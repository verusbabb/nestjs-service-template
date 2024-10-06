import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalPartyAxiosClientService } from './external-party-axios-client.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalPartyAxiosClientService],
  exports: [ExternalPartyAxiosClientService],
})
export class ExternalPartyAxiosClientModule {}
