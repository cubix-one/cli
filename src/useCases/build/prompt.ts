import * as p from '@clack/prompts';
import color from 'picocolors';
import { fsSync } from '@cubix-one/utils';

interface PromptOptions {
	projectName: string;
	packageManager: string;
	rootDir: string;
	outputDir: string;
}

const options: PromptOptions = {
	projectName: '',
	packageManager: '',
	rootDir: '',
	outputDir: '',
};

export async function performPrompt(
	projectName: string,
): Promise<PromptOptions> {
	options.projectName = projectName;
	process.stdout.write('\x1Bc');
	console.log('');
	p.intro(color.bgCyan(color.bold(' 🧊 CREATE CUBIX PROJECT 🧊 ')));

	const promptData = await p.group(
		{
			projectName: () => promptProjectName(),
			packageManager: () => promptPackageManager(),
			rootDir: () => promptRootDir(),
			outputDir: () => promptOutputDir(),
		},
		{
			onCancel: () => promptOnCancel(),
		},
	);

	return promptData as PromptOptions;
}

async function promptProjectName(): Promise<string | symbol> {
	return await p.text({
		message: '✍️  project name',
		placeholder: 'my-project',
		initialValue: options.projectName || '',
		validate: (value: string) => {
			const validProjectNameRegex = /^[a-z]+(?:[-_][a-z]+)*$/;
			if (value.length === 0) {
				return 'Project name is required';
			}
			if (!validProjectNameRegex.test(value)) {
				return 'Project name must contain only lowercase letters, separated by "-" or "_"';
			}
			if (fsSync.directoryExists(value)) {
				return 'Directory already exists';
			}
			return;
		},
	});
}

async function promptPackageManager(): Promise<string | symbol> {
	return await p.select({
		message: '🔗 package manager',
		options: [
			{ value: 'bun', label: 'bun', hint: 'recommended' },
			{ value: 'npm', label: 'npm' },
			{ value: 'yarn', label: 'yarn' },
			{ value: 'pnpm', label: 'pnpm' },
		],
		initialValue: 'bun',
	});
}

async function promptRootDir(): Promise<string | symbol> {
	return await p.text({
		message: '📁 root directory',
		placeholder: 'src',
		initialValue: 'src',
	});
}

async function promptOutputDir(): Promise<string | symbol> {
	return await p.text({
		message: '📂 output directory',
		placeholder: 'out',
		initialValue: 'out',
	});
}

async function promptOnCancel(): Promise<void> {
	p.cancel('Operation cancelled');
	process.exit(0);
}
