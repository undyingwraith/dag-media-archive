import CID from 'cids';
import {IArchive, IMediaEntry} from '../../types';
import {ICollection} from '../../types/ICollection';

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
	 * Returns the list of all collections
	 *
	 * @returns Promise<ICollection[]> list of all collections in the archive
	 */
	getCollections(): Promise<ICollection[]>

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
