"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const secret_manager_1 = require("@google-cloud/secret-manager");
const app_module_1 = require("./modules/app.module");
async function bootstrap() {
    const app_id = "Template";
    const logger = new common_1.Logger(`Verus ${app_id}`);
    // Initialize GCP Secret Manager client
    const secretManager = new secret_manager_1.SecretManagerServiceClient();
    // Create a custom ConfigService that uses GCP Secret Manager
    const configService = new config_1.ConfigService(async (key) => {
        try {
            const [version] = await secretManager.accessSecretVersion({
                name: `projects/${process.env.GCP_PROJECT_ID}/secrets/${key}/versions/latest`,
            });
            return version?.payload?.data?.toString();
        }
        catch (error) {
            if (error instanceof Error) {
                logger.error(`Failed to fetch secret ${key}: ${error.message}`);
            }
            else {
                logger.error(`Failed to fetch secret ${key}: ${String(error)}`);
            }
            return undefined;
        }
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    // Use the custom ConfigService
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    // Fetch port from GCP Secret Manager
    const port = (await configService.get("APP_EXAMPLE_SERVICE_PORT")) || 8110;
    app.useLogger(logger);
    app.use((0, helmet_1.default)({
        hsts: { maxAge: 31536000 },
        frameguard: { action: "deny" },
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "frame-ancestors": ["'none'"],
            },
        },
    }));
    await app.listen(port, "0.0.0.0");
    logger.log(`Nest Service is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=index.js.map