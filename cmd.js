const childProcess = require('child_process');

if (process.argv.length < 3) {
	console.log('Invalid arguments');
	process.exit(-1);
}

let command = process.argv.splice(2, process.argv.length).join(' ');
if (process.platform == 'win32') {
	command = command.replace(/\//g, '\\');
}

const spawnedProcess = childProcess.spawn(command, {
	stdio: 'inherit', // inherit parent's stdin, stdout, stderr streams
	shell: true // allow shell syntax in command
});

// If spawn fails, output error
spawnedProcess.on('error', (err) => console.error(err))
