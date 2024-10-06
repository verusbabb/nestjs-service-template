"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var tslib_1 = require("tslib");
var axios_1 = require("@nestjs/axios");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app/app.controller");
var app_service_1 = require("./app/app.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        // https://docs.nestjs.com/middleware#excluding-routes
    };
    AppModule = tslib_1.__decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    // load: [envConfig] TODO: Add env variables
                }),
                axios_1.HttpModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map