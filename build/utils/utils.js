"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someUtilFunction = void 0;
var config_1 = require("@nestjs/config");
var configService = new config_1.ConfigService();
function someUtilFunction() {
    var some_variable = configService.get('RANDOM_VAR');
    var result = some_variable;
    return result;
}
exports.someUtilFunction = someUtilFunction;
//# sourceMappingURL=utils.js.map