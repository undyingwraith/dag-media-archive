import CID from 'cids';
import {IImageEntry} from './IImageEntry';

export interface IVideoEntry extends IImageEntry {
	thumbnails: CID[]
}
