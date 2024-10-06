import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export function someUtilFunction() {
  const some_variable = configService.get('RANDOM_VAR');
  const result = some_variable;
  return result;
}
