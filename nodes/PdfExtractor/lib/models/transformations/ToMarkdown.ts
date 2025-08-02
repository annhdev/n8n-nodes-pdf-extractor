// import MarkdownPageView from '../../components/debug/MarkdownPageView';
import Transformation from './Transformation';
import ParseResult from '../ParseResult';

export default class ToMarkdown extends Transformation {

	constructor() {
		super("To Markdown", "String");
	}

	createPageView(page: any, modificationsOnly: any) {
		return `<div data-key="${page.index}">${JSON.stringify(page)}</div>`;
	}

	transform(parseResult: any) {
		parseResult.pages.forEach((page: any) => {
			let text = '';
			page.items.forEach((block: any) => {
				text += block.text + '\n';
			});
			page.items = [text];
		});
		return new ParseResult({
			...parseResult,
		});
	}

}
