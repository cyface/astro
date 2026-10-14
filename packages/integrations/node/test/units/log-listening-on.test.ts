import assert from 'node:assert/strict';
import http from 'node:http';
import type { AddressInfo } from 'node:net';
import { describe, it } from 'node:test';
import { logListeningOn } from '../../dist/log-listening-on.js';

describe('logListeningOn', () => {
	it('logs when the server is already listening', async () => {
		const server = http.createServer();
		await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
		const messages: string[] = [];
		const logger = { info: (message: string) => messages.push(message) };
		try {
			await logListeningOn(logger as any, server, '127.0.0.1');
			const { port } = server.address() as AddressInfo;
			assert.deepEqual(messages, [`Server listening on http://127.0.0.1:${port}`]);
		} finally {
			server.close();
		}
	});
});
