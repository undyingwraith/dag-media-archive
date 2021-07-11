import CID from 'cids';
import {IMediaEntry} from './IMediaEntry';

export interface IAudioEntry extends IMediaEntry {
	cover?: CID
}
