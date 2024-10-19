// import { TestingModule } from '@nestjs/testing';
// import { ConfigService } from '@nestjs/config';
// import { AppService } from './app.service';
// import { SharedTestingModule } from '../shared-testing.module';
// import { InternalServerErrorException } from '@nestjs/common';

// describe('AppService', () => {
//   let appService: AppService;
//   let configService: ConfigService;

//   beforeEach(async () => {
//     const module: TestingModule = await SharedTestingModule;

//     appService = module.get<AppService>(AppService);
//     configService = module.get<ConfigService>(ConfigService);
//   });

//   describe('healthCheck', () => {
//     it('should return health confirmation when database is available', async () => {

//       const friendlyName = configService.get<string>('FRIENDLY_NAME');
//       const health_msg = `${friendlyName} is Alive and Healthy`;
//       const response = await appService.healthCheck();
//       expect(response).toBe(health_msg);
//     });

//     it('should throw an InternalServerErrorException if the database is not available', async () => {

//       await expect(appService.healthCheck()).rejects.toThrow(InternalServerErrorException);
//     });
//   });
// });
