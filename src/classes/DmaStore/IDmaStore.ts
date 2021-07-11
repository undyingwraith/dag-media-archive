import CID from 'cids';
import {IArchive, IMediaEntry} from '../../types';

/**
 *
 */
export interface IDmaStore<T extends IMediaEntry> {
	/**
	 *
	 * @param media
	 */
	writeMedia(media: T): Promise<CID>

	/**
	 *
	 * @param id
	 */
	readMedia(id: string): Promise<T>

	/**
	 * Returns the list of all media
	 *
	 * @returns Promise<T[]> list of all media in the archive
	 */
	getList(): Promise<T[]>

	/**
	 *
	 */
	getRoot(): Promise<IArchive>

	/**
	 * Returns current cid of archive
	 *
	 * @returns Promise<CID> current archive cid
	 */
	export(): Promise<CID>
}
