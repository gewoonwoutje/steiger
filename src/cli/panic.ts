export function panic(errorMessage: string, exitCode = -1): never {
	Deno.stderr.writeSync(new TextEncoder().encode(errorMessage));
	Deno.exit(exitCode);
}
