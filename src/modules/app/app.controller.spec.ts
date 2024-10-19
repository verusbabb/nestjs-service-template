// import { TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { SharedTestingModule } from '../shared-testing.module';
// import { AppService } from './app.service';

// describe('AppController', () => {
//   let appController: AppController;
//   let appService: AppService;

//   beforeEach(async () => {
//     const module: TestingModule = await SharedTestingModule;

//     appService = module.get(AppService);
//     appController = module.get<AppController>(AppController);
//   });

//   it('should be defined', () => {
//     expect(appService).toBeDefined();
//     expect(appController).toBeDefined();
//   });

//   describe('healthCheck', () => {
//     it('should return health check successfully', async () => {
//       jest
//         .spyOn(appService, 'healthCheck')
//         .mockResolvedValue('Pure PM Example Service and Database are Alive and Healthy');
//       const response = await appController.healthCheck();
//       expect(response).toBe('Pure PM Example Service and Database are Alive and Healthy');
//     });
//   });
// });
