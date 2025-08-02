import Transformation from './Transformation';
import LineItemBlock from '../LineItemBlock';
// import LineItemBlockPageView from '../../components/debug/LineItemBlockPageView';
import {REMOVED_ANNOTATION} from '../Annotation';

// Abstract class for transformations producing LineItemBlock(s) to be shown in the LineItemBlockPageView
export default class ToLineItemBlockTransformation extends Transformation {
	showWhitespaces: boolean;

	constructor(name: any) {
		super(name, LineItemBlock.name);
		if (this.constructor === ToLineItemBlockTransformation) {
			throw new TypeError("Can not construct abstract class.");
		}
		this.showWhitespaces = false;
	}

	showModificationCheckbox() {
		return true;
	}

	createPageView(page: any, modificationsOnly: any) {
		return `<div data-key="${page.index}">${page}</div>`;
	}

	completeTransform(parseResult: any): any {
		// The usual cleanup
		parseResult.messages = [];
		parseResult.pages.forEach((page: any) => {
			page.items = page.items.filter((item: any) => !item.annotation || item.annotation !== REMOVED_ANNOTATION);
			page.items.forEach((item: any) => item.annotation = null);
		});
		return parseResult;
	}

}
