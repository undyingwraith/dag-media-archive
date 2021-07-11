import CID from 'cids';
import {IArchive, IMediaEntry} from '../../types';
import {ICollection} from '../../types/ICollection';
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
		const archive = new DmaArchive(node);
		return  archive.put({})
				.then(cid => {
					return archive.put({
						name: name,
						media: cid,
						collections: cid,
						version: 1,
					} as IArchive);
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
		return new Promise<T[]>((resolve, reject) => {
			this.archive.fetch()
				.then(archive => this.archive.get(archive.media))
				.then(list => this.fetchAll<T>(list))
				.then(data => {
					resolve(data);
				})
				.catch(reject);
		});
	}

	getCollections(): Promise<ICollection[]> {
		return new Promise((resolve, reject) => {
			this.archive.resolve('/collections')
				.then(cid => this.archive.get(cid))
				.then(list => this.fetchAll<ICollection>(list))
				.then(data => {
					resolve(data);
				})
				.catch(reject);
		});
	}

	private fetchAll<T>(items: { [key: string]: CID }): Promise<T[]> {
		return new Promise((resolve, reject) => {
			const promises = [];

			for (let item in items) {
				promises.push(this.archive.get(items[item]));
			}

			Promise.all(promises)
				.then((data) => {
					resolve(data);
				})
				.catch(reject);
		});
	}
}
