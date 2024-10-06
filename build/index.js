"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var helmet_1 = require("helmet");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var common_1 = require("@nestjs/common");
var app_module_1 = require("./modules/app.module");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var app_id, logger, app, configService, port, _a, _b, _c;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    app_id = "Template";
                    logger = new common_1.Logger("Verus ".concat(app_id));
                    return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule, {
                            bufferLogs: true,
                        })];
                case 1:
                    app = _d.sent();
                    configService = app.get(config_1.ConfigService);
                    port = configService.get("APP_EXAMPLE_SERVICE_PORT") || 8110;
                    app.useLogger(logger);
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        transform: true,
                        whitelist: true, // this will strip away any extra keys in the request DTOs
                    }));
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
                    return [4 /*yield*/, app.listen(port, "0.0.0.0")];
                case 2:
                    _d.sent();
                    _b = (_a = logger).log;
                    _c = "Nest Service'} is running on: ".concat;
                    return [4 /*yield*/, app.getUrl()];
                case 3:
                    _b.apply(_a, [_c.apply("Nest Service'} is running on: ", [_d.sent()])]);
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
//# sourceMappingURL=index.js.map