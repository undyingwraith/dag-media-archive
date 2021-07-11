import CID from 'cids';
import {IArchive, IMediaEntry} from '../../types';
import {DmaArchive, IDmaArchive} from '../DmaArchive';
import {IDmaStore} from './IDmaStore';

export class DmaStore<T extends IMediaEntry> implements IDmaStore<T> {
	private archive: IDmaArchive;

	private constructor(private node: any, cid?: CID) {
		this.archive = new DmaArchive(node, cid ?? new CID('bafyriqbp63xyywdqeoij36kxnh7jwqkvrfwn2toju3o3no7jcxpopjwhw4sz5vwwl5i3zizaxbmngkwwhc6cn72wijcedqhybirp62ahgigs6'));
	}

	/**
	 *
	 * @param node
	 * @param cid
	 */
	static create<T extends IMediaEntry>(node: any, cid?: CID): Promise<IDmaStore<T>> {
		if (cid) {
			return Promise.resolve(new DmaStore(node, cid));
		} else {
			return new Promise((resolve, reject) => {
				DmaStore.initialize(node).then(cid => resolve(new DmaStore(node, cid)));
			});
		}
	}

	/**
	 *
	 * @param node
	 * @param name
	 */
	static initialize(node: any, name = 'DmaStore'): Promise<CID> {
		return new Promise((resolve, reject) => {
			const archive = new DmaArchive(node);
			archive.put({})
				.then(cid => {
					return archive.put({
						name: name,
						media: cid,
						version: 1,
					} as IArchive);
				})
				.catch(reject);
		});
	}

	/**
	 * @inheritDoc
	 */
	writeMedia(media: T): Promise<CID> {
		return new Promise((resolve, reject) => {
			let mediaCid: any;
			let archive: any;
			this.archive.put(media).then(cid => {
				mediaCid = cid;
				return this.archive.fetch();
			}).then(a => {
				archive = a;
				return this.archive.get(a.media);
			}).then(mediaList => {
				mediaList[media.id] = mediaCid;
				return this.archive.put(mediaList);
			}).then(mediaListCid => {
				archive.media = mediaListCid;
				return this.archive.set(archive);
			}).then((cid: CID) => {
				console.log('writeMedia', cid);
				resolve(cid);
			}).catch(reject);
		});
	}

	/**
	 * @inheritDoc
	 */
	readMedia(id: string): Promise<T> {
		return this.archive.resolve(`/media/${id}`);
	}

	/**
	 * @inheritDoc
	 */
	getRoot(): Promise<IArchive> {
		return this.archive.fetch();
	}

	/**
	 * @inheritDoc
	 */
	export(): Promise<CID> {
		return this.archive.export();
	}

	/**
	 * @inheritDoc
	 */
	getList(): Promise<T[]> {
		return Promise.resolve([]);
	}
}
