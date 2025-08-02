import ToLineItemTransformation from '../ToLineItemTransformation';
import ParseResult from '../../ParseResult';
import LineItem from '../../LineItem';
import StashingStream from '../../StashingStream';
import {REMOVED_ANNOTATION, ADDED_ANNOTATION} from '../../Annotation';

// Converts vertical text to horizontal
export default class VerticalToHorizontal extends ToLineItemTransformation {

	constructor() {
		super("Vertical to Horizontal Text");
	}

	transform(parseResult: any) {
		let foundVerticals = 0;
		parseResult.pages.forEach((page: any) => {
			const stream = new VerticalsStream();
			stream.consumeAll(page.items);
			page.items = stream.complete();
			foundVerticals += stream.foundVerticals;
		});

		return new ParseResult({
			...parseResult,
			messages: ["Converted " + foundVerticals + " verticals"]
		});
	}

}

class VerticalsStream extends StashingStream {
	foundVerticals: number;

	constructor() {
		super();
		this.foundVerticals = 0;
	}

	shouldStash(item: any) {
		return item.words.length == 1 && item.words[0].string.length == 1;
	}

	doMatchesStash(lastItem: any, item: any) {
		return lastItem.y - item.y > 5 && lastItem.words[0].type === item.words[0].type;
	}

	doFlushStash(stash: any, results: any) {
		if (stash.length > 5) { // unite
			let combinedWords: any[] = [];
			let minX = 999;
			let maxY = 0;
			let sumWidth = 0;
			let maxHeight = 0;
			stash.forEach((oneCharacterLine: any) => {
				oneCharacterLine.annotation = REMOVED_ANNOTATION;
				results.push(oneCharacterLine);
				combinedWords.push(oneCharacterLine.words[0]);
				minX = Math.min(minX, oneCharacterLine.x);
				maxY = Math.max(maxY, oneCharacterLine.y);
				sumWidth += oneCharacterLine.width;
				maxHeight = Math.max(maxHeight, oneCharacterLine.height);
			});
			results.push(new LineItem({
				...stash[0],
				x: minX,
				y: maxY,
				width: sumWidth,
				height: maxHeight,
				words: combinedWords,
				annotation: ADDED_ANNOTATION
			}));
			this.foundVerticals++;
		} else { //add as singles
			results.push(...stash);
		}
	}
}
