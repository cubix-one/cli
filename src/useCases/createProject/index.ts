import simpleGit, { type SimpleGit } from 'simple-git';
import path from 'node:path';
import { fsAsync } from '@cubix-one/utils';
import { devDependencies } from '@cubix-one/definitions';
import { execa } from 'execa';

interface ISpinner {
	start: (msg?: string) => void;
	stop: (msg?: string, code?: number) => void;
	message: (msg?: string) => void;
}

interface IOptions {
	projectName: string;
	packageManager: string;
	outputDir: string;
	rootDir: string;
}

export default class CreateProject {
	private readonly spinner: ISpinner;
	private readonly git: SimpleGit;

	constructor(
		private readonly options: IOptions,
		spinner: ISpinner,
	) {
		this.options = options;
		this.spinner = spinner;
		this.git = simpleGit();
	}

	public async perform(): Promise<boolean> {
		await this.createProjectDirectory();
		await this.downloadTemplate();
		await this.createRootDirectory();
		await this.updateFlags();
		await this.installDependencies();
		return true;
	}

	private async createProjectDirectory(): Promise<boolean> {
		this.spinner.start('Creating project directory...');

		const path = `${process.cwd()}/${this.options.projectName}`;
		const result = await fsAsync.createDirectory(path, true);

		if (!result) {
			this.doError('Failed to create project directory');
		}

		return true;
	}

	private async downloadTemplate(): Promise<boolean> {
		const { projectName } = this.options;
		const repoUrl = 'https://github.com/cubix-one/template.git';
		const destPath = `${process.cwd()}/${projectName}`;

		this.spinner.message('Cloning template repository...');

		await this.git
			.clone(repoUrl, destPath, {
				'--branch': 'main',
			})
			.catch((error) => {
				this.doError(`Failed to clone template repository: ${error.message}`);
			});

		this.spinner.message('Template repository cloned successfully');
		return true;
	}

	private async createRootDirectory(): Promise<boolean> {
		const { projectName, rootDir } = this.options;
		const path = `${process.cwd()}/${projectName}/${rootDir}`;
		const result = await fsAsync.createDirectory(path, true);

		if (!result) {
			this.doError('Failed to create root directory');
		}

		return true;
	}

	private async updateFlags(): Promise<boolean> {
		const flags = ['::PROJECT_NAME::', '::ROOT_DIR::', '::OUT_DIR::'];
		const values = [
			this.options.projectName,
			this.options.rootDir,
			this.options.outputDir,
		];
		const path = `${process.cwd()}/${this.options.projectName}`;
		const files = await fsAsync.getAllFiles(path);

		this.spinner.message('Updating flags...');

		for (const file of files) {
			let content = (await fsAsync.readFile(file)) as string;
			flags.forEach((flag, index) => {
				const value = values[index];
				content = content.replaceAll(flag, value);
			});
			await fsAsync.writeFile(file, content);
		}

		this.spinner.message('Flags updated successfully');
		return true;
	}

	private async installDependencies(): Promise<boolean> {
		const { projectName, packageManager } = this.options;
		const projectPath = path.join(process.cwd(), projectName);

		this.spinner.message('Installing dependencies...');

		if (!(await fsAsync.fileExists(path.join(projectPath, 'package.json')))) {
			this.doError('package.json not found');
		}

		const installCommand = this.getPackageManagerCommand(packageManager);

		try {
			await execa(packageManager, ['install'], { cwd: projectPath });
			await execa(packageManager, [...installCommand, ...devDependencies], {
				cwd: projectPath,
			});
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} catch (error: any) {
			this.doError(`Failed to install dependencies: ${error.message}`);
		}

		return true;
	}

	private getPackageManagerCommand(packageManager: string): string[] {
		switch (packageManager) {
			case 'npm':
				return ['install', '--save-dev'];
			case 'yarn':
				return ['add', '--dev'];
			case 'pnpm':
				return ['add', '--save-dev'];
			case 'bun':
				return ['add', '--dev'];
			default:
				this.doError(`Unsupported package manager: ${packageManager}`);
				return [];
		}
	}

	private doError(message: string): void {
		this.spinner.stop();
		console.error(message);
		process.exit(1);
	}
}
