import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { getPackageInfo } from "../../utils/getCleanedPackageName";
import { ConfigService } from "@nestjs/config";

function buildSwagger(app: INestApplication, appId: string) {
  const { packageVersion: packageVersion } = getPackageInfo();
  const configService = app.get(ConfigService);

  // Access the ENV variable
  const env = configService.get<string>("NODE_ENV");
  const title = `${appId} Service ` + `(${env})`;

  // Setup Swagger options and include the actual ENV value
  const options = new DocumentBuilder()
    .setTitle(`${title}`)
    .setDescription(`Backend ${appId} Service`)
    .setVersion(packageVersion)
    .addTag("#tag")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  return document;
}

export function setupSwagger(app: INestApplication, appId: string) {
  const document = buildSwagger(app, appId);
  SwaggerModule.setup("api", app, document);
}
