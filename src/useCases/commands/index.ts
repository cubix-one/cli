import Build from '@useCases/build';
import { Command } from 'commander';

export default class Commands {
	program: Command;
	constructor(private argv: string[]) {
		this.program = new Command();
	}

	perform(): void {
		this.welcome();
		this.defineOptions();
		this.defineCommands();
		this.defineDefaultCommand();
		this.program.parse(this.argv);
	}

	private welcome(): void {
		const { version } = require('../../../package.json');
		this.program.name('cubix').description('Cubix CLI').version(version);
	}

	private defineOptions(): void {
		this.program.option('-r, --rootDir <dir>', 'Root directory');
		this.program.option('-o, --outputDir <dir>', 'Output directory');
		this.program.option('-w, --watch', 'Watch for file changes');
		this.program.option('-v, --version', 'Show current version');
	}

	private defineCommands(): void {
		this.program
			.command('new [projectName]')
			.description('Create a new project')
			.allowUnknownOption(true)
			.action(async (projectName) => {
				new Build(projectName).perform();
			});
	}

	private defineDefaultCommand(): void {
		this.program.action(async () => {
			const option = this.program.opts();

			if (option.watch) {
				console.log('Watching for file changes...');
			}
		});
	}
}
