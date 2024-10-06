"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someUtilFunction = someUtilFunction;
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
function someUtilFunction() {
    const some_variable = configService.get('RANDOM_VAR');
    const result = some_variable;
    return result;
}
//# sourceMappingURL=utils.js.map