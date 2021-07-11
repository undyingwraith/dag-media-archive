import CID from 'cids';

export interface IMediaEntry {
	id: string
	source: CID
	uri: string
	meta?: { [key: string]: any }
}
