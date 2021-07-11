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
	 *
	 */
	getRoot(): Promise<IArchive>

	/**
	 *
	 */
	export(): Promise<CID>
}