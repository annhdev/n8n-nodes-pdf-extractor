import {sortByX} from '../pageItemFunctions'

//Groups all text items which are on the same y line
export default class TextItemLineGrouper {
	mostUsedDistance: number;

	constructor(options: any) {
		this.mostUsedDistance = options.mostUsedDistance || 12;
	}

	// returns a CombineResult
	group(textItems: any[]) {
		return this.groupItemsByLine(textItems);
	}


	groupItemsByLine(textItems: any[]) {
		const lines = [];
		let currentLine: any[] = [];
		textItems.forEach(item => {
			if (currentLine.length > 0 && Math.abs(currentLine[0].y - item.y) >= this.mostUsedDistance / 2) {
				lines.push(currentLine);
				currentLine = [];
			}
			currentLine.push(item);
		});
		lines.push(currentLine);

		lines.forEach(lineItems => {
			// we can't trust order of occurence, esp. footnoteLinks like to come last
			sortByX(lineItems);
		});
		return lines;
	}

}
