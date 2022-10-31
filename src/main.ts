import { join } from 'path/mod.ts';
import { parse } from 'flags/mod.ts';
import { cloneRepo } from './api/mod.ts';

const { name, _ } = parse(Deno.args);
const p: string = (name && [name]) || _[0];
if (!p) {
	Deno.stderr.writeSync(new TextEncoder().encode('No path was provided'));
	Deno.exit(-1);
}
const path = join(Deno.cwd(), p);

cloneRepo('https://github.com/gewoonwoutje/deno-scaffolding.git', path);
