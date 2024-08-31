import * as p from '@clack/prompts';
import color from 'picocolors';
import { fsAsync } from '@cubix-one/utils';
import { performPrompt } from './prompt';
import CreateProject from '@useCases/createProject';

export default class Build {
	private projectName: string;
	private packageManager: string;
	private rootDir: string;
	private outputDir: string;

	constructor(projectName?: string) {
		this.projectName = projectName || '';
		this.rootDir = '';
		this.outputDir = '';
		this.packageManager = '';
	}

	public async perform() {
		await this.validations();
		await this.prompt();
		p.log.info('🚀 Initializing Setup');
		await this.createProject();
		this.finalMessage();

		process.exit(0);
	}

	private async validations(): Promise<boolean> {
		if (this.projectName.length > 0) {
			if (await fsAsync.directoryExists(this.projectName)) {
				this.doError('Directory already exists');
			}
		}

		return true;
	}

	private async prompt() {
		const promptData = await performPrompt(this.projectName);

		this.projectName = promptData.projectName;
		this.packageManager = promptData.packageManager;
		this.rootDir = promptData.rootDir;
		this.outputDir = promptData.outputDir;
	}

	private async createProject() {
		const spinner = p.spinner();

		await new CreateProject(
			{
				projectName: this.projectName,
				packageManager: this.packageManager,
				rootDir: this.rootDir,
				outputDir: this.outputDir,
			},
			spinner,
		).perform();

		spinner.stop(color.bgGreen(color.bold(' ✅ COMPLETED ✅ ')));
	}

	private finalMessage() {
		const message = `
        ${color.bgCyan(color.reset(' 🧊 Project created successfully! 🧊 '))}\n
        To start the project, run: ${this.packageManager} run watch\n
        To build the project, run: ${this.packageManager} run build\n
        `;

		p.note(message);
		p.outro(
			`for more information, visit ${color.cyan(color.bold(color.underline('https://github.com/cubix-one/cubix')))}`,
		);
	}

	private doError(message: string): void {
		console.error(message);
		process.exit(1);
	}
}
