import * as path from 'path';
import * as fs from 'fs';

let packageName: string;
let packageVersion: string;

export function getCleanedPackageName() {
  const { packageName } = getPackageInfo();
  if (packageName) {
    const packageParts = packageName.split('/');
    packageParts.shift();
    if (packageParts.length > 0) {
      return packageParts.join('');
    } else {
      return packageName;
    }
  }
}

export function getPackageInfo() {
  if (!packageName || !packageVersion) {
    const packagePath = path.resolve('./package.json');
    const packageFile = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const { name, version } = packageFile as { name: string; version: string };
    packageName = name;
    packageVersion = version;
  }
  return { packageName, packageVersion };
}
