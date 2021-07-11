import {DmaStore} from '../classes';
import CID from 'cids';
import Ipfs from 'ipfs-core';
import {CONSTANTS} from './const';

const node = Ipfs.create();

describe('DmaStore', () => {
	it('init works', async () => {
		const store = new DmaStore(node);
		await expect(store.initialize()).resolves.toStrictEqual(undefined);
		await expect(store.getRoot()).resolves.toMatchSnapshot();
		await expect(store.export()).resolves.toMatchObject(CONSTANTS.baseCid);
	});

	it('write works', async () => {
		const store = new DmaStore(node, CONSTANTS.baseCid);
		await expect(store.writeMedia({
			id: 'ebb941ae-419e-4848-8664-57597ddb214e',
			source: new CID('bafybeia2fz5fkkqmjlivj7jrlecschnkkhy2z5ced3velgpjydl2lzdglu'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWOne);
	});

	it('consecutive write works', async () => {
		const store = new DmaStore(node, CONSTANTS.baseCid);
		await expect(store.writeMedia({
			id: 'ebb941ae-419e-4848-8664-57597ddb214e',
			source: new CID('bafybeia2fz5fkkqmjlivj7jrlecschnkkhy2z5ced3velgpjydl2lzdglu'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWOne);
		await expect(store.writeMedia({
			id: '5c14df51-3d66-4389-849f-92aa04ffff61',
			source: new CID('bafybeidbnognu6nvv2z7dmmtqqpqtb47ya6d3loiqsrofadxtgg7yblbui'),
		})).resolves.toStrictEqual(CONSTANTS.baseCidWTwo);
	});

	it('read works', async () => {
		const store = new DmaStore(node, CONSTANTS.baseCidWTwo);
		await expect(store.readMedia('5c14df51-3d66-4389-849f-92aa04ffff61')).resolves.toMatchSnapshot();
	});
});
