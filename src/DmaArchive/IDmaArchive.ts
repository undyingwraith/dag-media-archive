import CID from 'cids';
import {IArchive} from '../types';

/**
 *
 */
export interface IDmaArchive {
	/**
	 *
	 */
	fetch(): Promise<IArchive>

	/**
	 *
	 * @param archive
	 */
	set(archive: IArchive): Promise<CID>

	/**
	 *
	 * @param cid
	 */
	get(cid: CID): Promise<any>

	/**
	 *
	 * @param data
	 */
	put(data: any): Promise<CID>

	/**
	 *
	 * @param path
	 */
	resolve(path: string): Promise<any>

	/**
	 * sets data at specified path in the archive
	 * @param path of where to put the data
	 * @param data to insert at specified path
	 * @returns Promise<CID> cid of the updated (archive can be ignored)
	 */
	update(path: string, data: any): Promise<CID>

	/**
	 *
	 */
	export(): Promise<CID>
}
