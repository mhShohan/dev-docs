const fs = require('fs/promises');
const path = require('path');

const files = [
  'interfaces',
  'model',
  'controller',
  'validator',
  'services',
  'routes'
];

const rootDir = 'src/app/modules';
const workDir = 'auth';

const createFiles = async (dir) => {
  for (const file of files) {
    await fs.writeFile(path.resolve(__dirname, rootDir, dir, `${dir}.${file}.ts`), '');
  }
};

const main = async () => {
  try {
    await fs.mkdir(path.resolve(__dirname, rootDir, workDir));
    await createFiles(workDir);
  } catch (error) {
    console.log(error);
  }
};

main();