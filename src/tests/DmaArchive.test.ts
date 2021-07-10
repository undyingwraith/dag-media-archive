import CID from 'cids';
import Ipfs from 'ipfs-http-client';
import {DmaArchive} from '../DmaArchive';
import {CONSTANTS} from './const';

const node = Ipfs.create();


describe('DmaArchive', () => {
	it('put works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.put({})).resolves.toStrictEqual(new CID('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'));
	});

	it('get works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.get(new CID('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'))).resolves.toStrictEqual({});
	});

	it('resolve works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.resolve('/media/ebb941ae-419e-4848-8664-57597ddb214e').then(value => {
			console.log(value);
			return value;
		})).resolves.toMatchSnapshot();
	});

	it('update data works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.update('/media/ebb941ae-419e-4848-8664-57597ddb214e/source', {hello: 'world'})).resolves.toStrictEqual(new CID('bafyriqbg6un5nazxiege7t5awfgng7ytwaees4vza5pw2knx3as377kusgabwv7tnhglgvdmjjdalqyyc2vwgsrgfghix3i5cnasjqtoxw3ma'));
	});

	it('update cid works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.update(
			'/media/ebb941ae-419e-4848-8664-57597ddb214e/source',
			new CID('bafybeihe7kldclv7zde2guf4pp2ec2tr4pynegh4gr4m57uwgsptnbjfjm',
			)))
			.resolves.toStrictEqual(new CID('bafyriqhts76doruqnnzt2ikwhfq4jyigy2ldqf5lwauwgksu2p6pgfitxy3q5sr3tb2znjwyqqb5tu4pyng2bwtiyuj4wjtezmtfvu4vlwvzq'));
	});

	it('update \'path must start with a "/"\'', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.update('a/b/c', {hello: 'world'})).rejects.toBe('path must start with a "/"');
	});

	it('resolve \'path must start with a "/"\'', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.resolve('a/b/c')).rejects.toBe('path must start with a "/"');
	});
});
