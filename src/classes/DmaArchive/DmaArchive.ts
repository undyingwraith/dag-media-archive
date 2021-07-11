import CID from 'cids';
import {IArchive} from '../../types';
import {IDmaArchive} from './IDmaArchive';

export class DmaArchive implements IDmaArchive {
	constructor(private node: any, private current?: CID) {

	}

	fetch(): Promise<IArchive> {
		if (!this.current) return Promise.reject('not initialized');
		return new Promise((resolve, reject) => {
			this.get(this.current!).then((obj: IArchive) => {
				resolve(obj);
			}).catch(reject);
		});
	}

	get(cid: CID): Promise<any> {
		return new Promise((resolve, reject) => {
			this.node.dag.get(cid).then((obj: { value: any }) => {
				resolve(obj.value);
			}).catch(reject);
		});
	}

	set(archive: IArchive): Promise<CID> {
		return new Promise((resolve, reject) => {
			this.put(archive).then((cid: CID) => {
				this.current = cid;
				resolve(cid);
			}).catch(reject);
		});
	}

	put(data: any): Promise<CID> {
		return new Promise((resolve, reject) => {
			this.node.dag.put(data, {format: 'dag-cbor', hashAlg: 'sha3-512'}).then((cid: CID) => {
				resolve(cid);
			}).catch(reject);
		});
	}

	resolve(path: string): Promise<any> {
		if (!this.current) return Promise.reject('not initialized');
		if (path.substr(0, 1) != '/') return Promise.reject('path must start with a "/"');
		let remainderPath: string;
		return new Promise((resolve, reject) => {
			this.node.dag.resolve(`${this.current!.toV1()}${path}`)
				.then((res: IResolveResult) => {
					remainderPath = res.remainderPath;
					return this.get(res.cid);
				})
				.then((data: any) => {
					if (remainderPath !== '') {
						let ls = remainderPath.lastIndexOf('/');
						if (ls === -1) {
							resolve(data[remainderPath]);
						} else {
							//TODO
							reject(remainderPath);
						}
					} else {
						resolve(data);
					}
				})
				.catch(reject);
		});
	}

	update(path: string, data: CID | any): Promise<CID> {
		if (!this.current) return Promise.reject('not initialized');
		if (path.substr(0, 1) != '/') return Promise.reject('path must start with a "/"');
		return new Promise(async (resolve, reject) => {
			if (data instanceof CID) {
				this.updateNext(this.current!, path, data, resolve, reject);
			} else {
				this.put(data).then((cid: CID) => {
					this.updateNext(this.current!, path, cid, resolve, reject);
				}).catch(reject);
			}
		});
	}

	private updateNext(root: CID, path: string, current: CID, resolve: (cid: CID) => void, reject: (e: any) => void) {
		let name = path.substr(path.lastIndexOf('/') + 1);
		let remainder = path.substr(0, path.lastIndexOf('/'));
		let remainderPath: string;
		this.node.dag.resolve(`${root.toV1()}${remainder}`)
			.then((res: IResolveResult) => {
				remainderPath = res.remainderPath;
				return this.get(res.cid);
			})
			.then((node: any) => {
				node[name] = current;
				return this.put(node);
			})
			.then((cid: CID) => {
				if (remainder === '') {
					console.log('update', cid);
					resolve(cid);
				} else {
					console.log('remainder', remainder);
					this.updateNext(root, remainder, cid, resolve, reject);
				}
			})
			.catch(reject);
	}

	export(): Promise<CID> {
		if (!this.current) return Promise.reject('not initialized');
		return Promise.resolve(this.current);
	}
}

interface IResolveResult {
	remainderPath: string
	cid: CID
}
