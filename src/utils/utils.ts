import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export function someUtilFunction() {
  const someVariable = configService.get('RANDOM_VAR');
  const result = someVariable;
  return result;
}
