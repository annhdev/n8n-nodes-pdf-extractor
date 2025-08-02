import {normalizedCharCodeArray} from '../stringFunctions'

export default class HeadlineFinder {
	headlineCharCodes: number[];
	stackedLineItems: any[];
	stackedChars: number;

	constructor(options: any) {
		this.headlineCharCodes = normalizedCharCodeArray(options.headline);
		this.stackedLineItems = [];
		this.stackedChars = 0;
	}

	consume(lineItem: any) {
		//TODO avoid join
		const normalizedCharCodes = normalizedCharCodeArray(lineItem.text());
		const matchAll = this.matchAll(normalizedCharCodes);
		if (matchAll) {
			this.stackedLineItems.push(lineItem);
			this.stackedChars += normalizedCharCodes.length;
			if (this.stackedChars == this.headlineCharCodes.length) {
				return this.stackedLineItems;
			}
		} else {
			if (this.stackedChars > 0) {
				this.stackedChars = 0;
				this.stackedLineItems = [];
				this.consume(lineItem); // test again without stack
			}
		}
		return null;
	}

	matchAll(normalizedCharCodes: any) {
		for (let i = 0; i < normalizedCharCodes.length; i++) {
			const headlineChar = this.headlineCharCodes[this.stackedChars + i];
			const textItemChar = normalizedCharCodes[i];
			if (textItemChar != headlineChar) {
				return false;
			}
		}
		return true;
	}
}
