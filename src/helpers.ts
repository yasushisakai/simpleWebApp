import { exec } from 'child_process';
import { appendFile } from 'fs';
import { join, resolve } from 'path';

const filePath: string = resolve(__dirname, '../');
const csvPath: string = join(filePath, 'pixels.csv');
const pyPath: string = join(filePath, 'scripts/updateImage.py');

export function savePixel(index: number, value: number): void  {
  const timestamp: number = Date.now();
  const newLine: string = `${timestamp},${index},${value}\n`;
  appendFile(csvPath, newLine, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(newLine);
  });
}

export function updateImage(): void {
  exec(`python ${pyPath}`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
