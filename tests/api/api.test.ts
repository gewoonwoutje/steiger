import { sayHi } from '/src/api/mod.ts';
import { assertEquals, describe, it } from '../test_deps.ts';

describe('Api', () => {
	it('says hello to your name', () => {
		const message = sayHi('MyName');
		assertEquals(message, 'Hi MyName');
	});
});
