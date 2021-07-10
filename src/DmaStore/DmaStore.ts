import CID from 'cids';
import {DmaArchive, IDmaArchive} from '../DmaArchive';
import {IMediaEntry} from '../types';
import {IArchive} from '../types';
import {IDmaStore} from './IDmaStore';

export class DmaStore<T extends IMediaEntry> implements IDmaStore<T> {
	private archive: IDmaArchive;

	constructor(private node: any, cid?: CID) {
		this.archive = new DmaArchive(node, cid ?? new CID('bafyriqbp63xyywdqeoij36kxnh7jwqkvrfwn2toju3o3no7jcxpopjwhw4sz5vwwl5i3zizaxbmngkwwhc6cn72wijcedqhybirp62ahgigs6'));
	}

	initialize(name = 'DmaStore'): Promise<void> {
		return new Promise((resolve, reject) => {
			this.archive.put({}).then(cid => {
				return this.archive.put({
					name: name,
					media: cid,
					version: 1,
				} as IArchive);
			}).then((cid: CID) => {
				this.archive = new DmaArchive(this.node, cid);
				console.log('initialize', cid);
				resolve();
			}).catch(reject);
		});
	}

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

	readMedia(id: string): Promise<T> {
		return this.archive.resolve(`/media/${id}`);
	}

	getRoot(): Promise<IArchive> {
		return this.archive.fetch();
	}

	export(): Promise<CID> {
		return this.archive.export();
	}
}
