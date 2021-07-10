import {CID} from 'ipfs-http-client';

export interface IMediaEntry {
	id: string
	source: CID
	meta?: { [key: string]: any }
}
