import CID from 'cids';
import {IMediaEntry} from './IMediaEntry';

export interface IImageEntry extends IMediaEntry {
	thumbnail: CID
}
