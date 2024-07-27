import { exec } from 'child_process';
import { platform } from 'os';

const currentPlatform = platform();

if (currentPlatform === 'linux') {
    exec('npm install @rollup/rollup-linux-x64-gnu@4.19.0', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
} else {
    console.log('Linux-specific package is not required on this platform.');
}
