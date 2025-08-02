// The result of a PDF parse respectively a Transformation
export default class ParseResult {
	pages: any;
	globals: any;
	messages: any;

	constructor(options: any) {
		this.pages = options.pages; // like Page[]
		this.globals = options.globals; // properties accasable for all the following transformations in debug mode
		this.messages = options.messages; // something to show only for the transformation in debug mode
	}

}
