export async function cloneRepo(url: string, path: string) {
	const proc = Deno.run({
		stderr: 'piped',
		stdout: 'piped',
		cmd: [
			'git',
			'clone',
			url,
			path,
		],
	});
	try {
		const [status, _output, errOutput] = await Promise.all([
			proc.status(),
			proc.output(),
			proc.stderrOutput(),
		]);
		if (!status.success) {
			const message = new TextDecoder().decode(errOutput);
			throw new Error(
				`Process exited with status code ${status.code}: ${message}`,
			);
		}
	} finally {
		proc.close();
	}
}
