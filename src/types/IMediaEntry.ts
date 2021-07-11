import CID from 'cids';

export interface IMediaEntry {
	id: string
	source: CID
	meta?: { [key: string]: any }
}
