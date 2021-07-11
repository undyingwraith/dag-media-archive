import {DmaStore, IDmaStore} from '../classes';
import CID from 'cids';
import Ipfs, {IPFS} from 'ipfs';
import {IMediaEntry} from '../types';
import {CONSTANTS} from './const';


describe('DmaStore write', () => {
	let node: IPFS;
	let store: IDmaStore<IMediaEntry>;

	beforeAll(async () => {
		node = await Ipfs.create();
	}, 10000);

	beforeEach(async () => {
		store = await DmaStore.create(node, CONSTANTS.baseCid);
	}, 10000);

	it('init works', async () => {
		await expect(DmaStore.initialize(node)).resolves.toStrictEqual(CONSTANTS.baseCid);
	});

	it('write works', async () => {
		await expect(store.writeMedia({
			id: 'ebb941ae-419e-4848-8664-57597ddb214e',
			source: new CID('bafybeia2fz5fkkqmjlivj7jrlecschnkkhy2z5ced3velgpjydl2lzdglu'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWOne);
	});

	it('consecutive write works', async () => {
		await expect(store.writeMedia({
			id: 'ebb941ae-419e-4848-8664-57597ddb214e',
			source: new CID('bafybeia2fz5fkkqmjlivj7jrlecschnkkhy2z5ced3velgpjydl2lzdglu'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWOne);
		await expect(store.writeMedia({
			id: '5c14df51-3d66-4389-849f-92aa04ffff61',
			source: new CID('bafybeidbnognu6nvv2z7dmmtqqpqtb47ya6d3loiqsrofadxtgg7yblbui'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWTwo);
	});
});

describe('DmaStore read', () => {
	let node: IPFS;
	let store: IDmaStore<IMediaEntry>;

	beforeAll(async () => {
		node = await Ipfs.create();
	}, 10000);

	beforeEach(async () => {
		store = await DmaStore.create(node, CONSTANTS.baseCidWTwo);
	}, 10000);

	it('read works', async () => {
		await expect(store.readMedia('5c14df51-3d66-4389-849f-92aa04ffff61')).resolves.toMatchSnapshot();
	});

	it('getList works', async () => {
		await expect(store.getList()).resolves.toMatchSnapshot();
	});
});
