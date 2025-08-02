// A abstract PageItem class, can be TextItem, LineItem or LineItemBlock
export default class PageItem {
	type: any;
	annotation: any;
	parsedElements: any;

	constructor(options: any) {
		if (this.constructor === PageItem) {
			throw new TypeError("Can not construct abstract class.");
		}
		this.type = options.type;
		this.annotation = options.annotation;
		this.parsedElements = options.parsedElements;
	}

}

export class ParsedElements {
	footnoteLinks: any;
	footnotes: any;
	containLinks: any;
	formattedWords: any;

	constructor(options: any) {
		this.footnoteLinks = options.footnoteLinks || [];
		this.footnotes = options.footnotes || [];
		this.containLinks = options.containLinks;
		this.formattedWords = options.formattedWords;
	}

	add(parsedElements: any) {
		this.footnoteLinks = this.footnoteLinks.concat(parsedElements.footnoteLinks);
		this.footnotes = this.footnotes.concat(parsedElements.footnotes);
		this.containLinks = this.containLinks || parsedElements.containLinks;
		this.formattedWords += parsedElements.formattedWords;
	}

}
