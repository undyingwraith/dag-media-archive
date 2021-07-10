import CID from 'cids';

export interface IArchive {
	name: string
	meta?: CID
	media: CID
	version: number
}
