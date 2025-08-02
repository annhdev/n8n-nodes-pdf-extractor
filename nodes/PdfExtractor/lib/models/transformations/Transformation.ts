// import ParseResult from '../ParseResult';

// A transformation from an PdfPage to an PdfPage
export default class Transformation {
	name: any;
	itemType: any;

	constructor(name: any, itemType: any) {
		if (this.constructor === Transformation) {
			throw new TypeError("Can not construct abstract class.");
		}
		if (this.transform === Transformation.prototype.transform) {
			throw new TypeError("Please implement abstract method 'transform()'.");
		}
		this.name = name;
		this.itemType = itemType;
	}

	showModificationCheckbox() {
		return false;
	}

	createPageView(page: any, modificationsOnly: any) {
		throw new TypeError("Do not call abstract method foo from child.");
	}

	// Transform an incoming ParseResult into an outgoing ParseResult
	transform(parseResult: any) {
		throw new TypeError("Do not call abstract method foo from child.");
	}

	// Sometimes the transform() does only visualize a change. This methods then does the actual change.
	completeTransform(parseResult: any) {
		parseResult.messages = [];
		return parseResult;
	}


}
