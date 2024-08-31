import Commands from '@useCases/commands';

const commands = new Commands(process.argv);
commands.perform();
