import CID from 'cids';
import Ipfs from 'ipfs-http-client';
import {DmaArchive} from '../classes';
import {CONSTANTS} from './const';


describe('DmaArchive', () => {
	let node: any;

	beforeAll(async () => {
		node = await Ipfs.create();
	}, 10000);

	it('put works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.put({})).resolves.toStrictEqual(new CID('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'));

		await expect(store.put({
			name: 'hello world',
			data: new CID('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'),
		})).resolves.toStrictEqual(new CID('bafyriqhlm57krvembr5rkjdovoaipysykzwxqnzzcff7k7xyhlrlpki4mmevfe37qgamjkkrdzbihpsatb7mzigroxlcncwa7xi3wicsbtkyy'));
	});

	it('get works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCid);
		await expect(store.get(new CID('bafyriqdqjbhwb2nfkbchrg65ckfpwjxawewjccyneooriyma4tdoiv3doramskqyam764vpoxakku6ldeuam6o62kwozpucom6eevm4ibajzi'))).resolves.toStrictEqual({});
	});

	it('resolve works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.resolve('/media/ebb941ae-419e-4848-8664-57597ddb214e')
			.then(value => {
				console.log('resolve works', value);
				return Promise.resolve(value);
			}))
			.resolves.toMatchSnapshot();
	});

	it('update data works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.update('/media/ebb941ae-419e-4848-8664-57597ddb214e/source', {hello: 'world'})
			.then(cid => {
				console.log('update data works', cid);
				return Promise.resolve(cid);
			}))
			.resolves.toStrictEqual(new CID('bafyriqhigwdnyeoo75ohipg2bf3gt25qp7gfvbh3e6lpytqgh52v6qtdc35ovm2uafucfn4fcw2vsd3ojnwfeudwdyshvyekhsm7qgyifrjhq'));
	});

	it('update cid works', async () => {
		const store = new DmaArchive(node, CONSTANTS.baseCidWTwo);
		await expect(store.update('/media/ebb941ae-419e-4848-8664-57597ddb214e/source', new CID('bafybeihe7kldclv7zde2guf4pp2ec2tr4pynegh4gr4m57uwgsptnbjfjm'))
			.then(cid => {
				console.log('update cid works', cid);
				return Promise.resolve(cid);
			}))
			.resolves.toStrictEqual(new CID('bafyriqaumaf6w65zkcv7grcohpk5unjnmi4spjau5vpzt3hwn5x42uhfvttruitwqrodx5a42owyey3blmjien4ue57wm5odxt7ue75fnyrv2'));
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
