import Transformation from './Transformation';
// import TextPageView from '../../components/debug/TextPageView';
import ParseResult from '../ParseResult';
import {blockToText} from '../markdown/BlockType';

export default class ToTextBlocks extends Transformation {

	constructor() {
		super("To Text Blocks", "TextBlock");
	}

	createPageView(page: any, modificationsOnly: any) {
		return `<div data-key="${page.index}">${page}</div>`;
	}

	transform(parseResult: any) {
		parseResult.pages.forEach((page: any) => {
			const textItems: any[] = [];
			page.items.forEach((block: any) => {
				//TODO category to type (before have no unknowns, have paragraph)
				const category = block.type ? block.type.name : 'Unknown';
				textItems.push({
					category: category,
					text: blockToText(block)
				});
			});
			page.items = textItems;
		});
		return new ParseResult({
			...parseResult,
		});
	}

}
