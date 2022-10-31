export async function invoke(cmd: string[], cwd?: string) {
	const proc = Deno.run({
		stderr: 'piped',
		stdout: 'piped',
		cmd,
		cwd,
	});

	try {
		const [status, output, errOutput] = await Promise.all([
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

		return { status, output, errOutput };
	} finally {
		proc.close();
	}
}
