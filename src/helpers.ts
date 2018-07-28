import { exec, execSync } from 'child_process';
import { appendFile } from 'fs';
import { join, resolve } from 'path';

const filePath: string = resolve(__dirname, '../');
const csvPath: string = join(filePath, 'pixels.csv');
const pyUpdatePath: string = join(filePath, 'scripts/updateImage.py');
const pyGetPath: string = join(filePath, 'scripts/getPixel.py');

let pixel_cnt = 0;
const width = 150;
const height = 100;

export function savePixel(index: number, value: number): void  {
  const timestamp: number = Date.now();
  const index_wrapped = index % (width * height);
  const newLine: string = `${timestamp},${index_wrapped},${value}\n`;
  appendFile(csvPath, newLine, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(`got: ${newLine}`);
  });
}

export function getPixel(index: number): number{
  const timestamp: number = Date.now();

  let value = execSync(`python ${pyGetPath} ${index}`).toString();

  return +value
}

export function updateImage(): void {
  exec(`python ${pyUpdatePath}`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
