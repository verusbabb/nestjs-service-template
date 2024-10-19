// import { TestingModule } from "@nestjs/testing";
// import { ConfigService } from "@nestjs/config";
// import { SharedTestingModule } from "../modules/shared-testing.module";
// import { getSecret, getEnv } from "../utils/env.config";
// import { SECRET_NOT_FOUND } from "../shared/types";

// describe("envConfig", () => {
//   let configService: ConfigService;

//   beforeEach(async () => {
//     const module: TestingModule = await SharedTestingModule;
//     configService = module.get<ConfigService>(ConfigService);
//   });

//   it("should get a static secret", () => {
//     const secretValue = getSecret("APP_EXAMPLE_SERVICE_PORT");
//     expect(secretValue).toBe("4011");
//   });

//   it("should get a remote secret from configService", () => {
//     const secretValue = configService.get<string>("FRIENDLY_NAME");
//     expect(secretValue).toBeDefined();

//     expect(secretValue).toBe("Pure PM Example Service");
//   });

//   it("should return doppler secrets if DOPPLER_SECRETS_PAYLOAD is set", () => {
//     const dopplerSecretsPayload = {
//       secretOne: "one",
//       secretTwo: "two",
//     };
//     process.env.DOPPLER_SECRETS_PAYLOAD = JSON.stringify(dopplerSecretsPayload);
//     const env = getEnv();

//     expect(env.secretOne).toEqual(dopplerSecretsPayload.secretOne);
//     expect(env.secretTwo).toEqual(dopplerSecretsPayload.secretTwo);

//     process.env.DOPPLER_SECRETS_PAYLOAD = undefined;
//   });

//   it("should return not found for a secret that does not exist", () => {
//     const secretValue = getSecret(
//       "AN_OBVIOUSLY_FAKE_SECRET_KEY_THAT_WE_WOULD_NEVER_USE",
//     );
//     expect(secretValue).toBe(SECRET_NOT_FOUND);
//   });
// });
