import { invoke } from './cli.ts';

export async function cloneRepo(
	url: string,
	path: string,
	extraOptions: string[] = [],
) {
	await invoke([
		'git',
		'clone',
		...extraOptions,
		url,
		path,
	]);
}

export async function initRepo(cwd?: string) {
	await invoke([
		'git',
		'init',
	], cwd);
}

export async function addAll(cwd?: string) {
	await invoke([
		'git',
		'add',
		'-A',
	], cwd);
}

export async function commit(commitMessage: string, cwd?: string) {
	await invoke([
		'git',
		'commit',
		'-m',
		commitMessage,
	], cwd);
}

export async function addAllAndCommit(commitMessage: string, cwd?: string) {
	await addAll(cwd);
	await commit(commitMessage, cwd);
}
