import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getPackageInfo } from '../../utils/getCleanedPackageName';

function buildSwagger(app: INestApplication, appId: string) {
  const title = `${appId} Service ` + '(${ENV})';
  const { packageVersion: packageVersion } = getPackageInfo();
  // const configService = app.get(ConfigService);

  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(`Backend ${appId} Service`)
    .setVersion(packageVersion)
    .addTag('#tag')
    // Experimental changes (FIGURE OUT which one to use)
    // https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer
    // https://docs.nestjs.com/openapi/security#oauth2-authentication
    // https://github.com/PascalKrijnberg/nestjs-swagger-auth0
    // .addOAuth2(
    //   {
    //     type: 'oauth2',
    //     flows: {
    //       implicit: {
    //         authorizationUrl: `${configService.get('JWT_ISSUER_BASE_URL')}authorize?audience=${configService.get(
    //           'AUTH0_AUDIENCE_PLATFORM_USER',
    //         )}`,
    //         tokenUrl: configService.get('AUTH0_AUDIENCE_PLATFORM_USER'),
    //         scopes: {},
    //       },
    //     },
    //     scheme: 'bearer',
    //     bearerFormat: 'JWT',
    //     in: 'header',
    //   },
    //   'Auth0',
    // )
    // // https://cloud.google.com/endpoints/docs/openapi/restricting-api-access-with-api-keys
    // .addApiKey(
    //   {
    //     type: 'apiKey', // this should be apiKey
    //     name: 'key', // this is the name of the key you expect in header
    //     in: 'query',
    //   },
    //   'api_key', // this is the name to show and used in swagger
    // )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  return document;
}

export function setupSwagger(app: INestApplication, appId: string) {
  const document = buildSwagger(app, appId);
  SwaggerModule.setup('api', app, document);
}
