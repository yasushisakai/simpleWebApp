import { exec, execSync } from 'child_process';
import { appendFile } from 'fs';
import { join, resolve } from 'path';

const filePath: string = resolve(__dirname, '../');
const csvPath: string = join(filePath, 'pixels.csv');
const pyUpdatePath: string = join(filePath, 'scripts/updateImage.py');
const imageMachinePath: string = join(filePath, 'image_machine/target/release/image_machine');
const pyGetPath: string = join(filePath, 'scripts/getPixel.py');

export function savePixel(index: number, value: number): void  {
  const timestamp: number = Date.now();
  const newLine: string = `${timestamp},${index},${value}\n`;
  appendFile(csvPath, newLine, (error) => {
    if (error) {
      console.error(error);
    }
    console.log(`c->s: ${newLine}`);
  });
}

export function getSize() : {width: number, height:number} {
  let string_value = execSync(`${imageMachinePath} size`).toString();
  let result = string_value.split(',').map((v) => +v);
  return {width: result[0], height:result[1]}
}

export function getPixel(index: number): number{
  let value = execSync(`${imageMachinePath} get ${index}`).toString();
  return +value
}

export function updateImage(): void {
  exec(`${imageMachinePath} update`, (error, stdout, stderr) => {
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    if (stderr != null) {
      console.log(`stderr: ${stderr.toString()}`);
    } 
    
    if (stdout != null) {
      console.log(`stdout: ${stdout.toString()}`);
    }
  });
  
}
