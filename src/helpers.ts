import { exec } from 'child_process';
import { appendFile } from 'fs';
import { join, resolve } from 'path';

const filePath: string = resolve(__dirname, '../');
const csvPath: string = join(filePath, 'pixels.csv');
const pyPath: string = join(filePath, 'scripts/updateImage.py');

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
    console.log(newLine);
  });
}

export function getPixel(index: number): number{
  const timestamp: number = Date.now();

  pixel_cnt ++;
  pixel_cnt %= 256;

  return pixel_cnt;
}

export function updateImage(): void {
  exec(`python ${pyPath}`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
