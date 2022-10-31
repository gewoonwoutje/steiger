import { basename, isAbsolute, join } from 'path/mod.ts';
import { parse } from 'flags/mod.ts';
import { git, panic } from './cli/mod.ts';

const { name, _ } = parse(Deno.args);
const arg: string = (name && [name]) || _[0];
if (!arg) {
	panic('No path was provided', 10);
}
const projectName = isAbsolute(arg) ? basename(arg) : arg;

const path = isAbsolute(arg) ? arg : join(Deno.cwd(), projectName);

await git.cloneRepo(
	'https://github.com/gewoonwoutje/deno-scaffolding.git',
	path,
	['--depth=1'],
);

const gitPath = join(path, '.git/');
await Deno.remove(gitPath, { recursive: true });

await git.initRepo(path);
await git.addAllAndCommit(`Initial scaffolding for ${projectName}`, path);
console.log(`Project "${projectName}" is scaffolded in: ${path}`);
