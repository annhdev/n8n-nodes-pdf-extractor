import Transformation from './Transformation';
import LineItem from '../LineItem';
// import LineItemPageView from '../../components/debug/LineItemPageView.jsx';
import {REMOVED_ANNOTATION} from '../Annotation';

// Abstract class for transformations producing LineItem(s) to be shown in the LineItemPageView
export default class ToLineItemTransformation extends Transformation {
	showWhitespaces: boolean;

	constructor(name: any) {
		super(name, LineItem.name);
		if (this.constructor === ToLineItemTransformation) {
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

	completeTransform(parseResult: any) {
		// The usual cleanup
		parseResult.messages = [];
		parseResult.pages.forEach((page: any) => {
			page.items = page.items.filter((item: any) => !item.annotation || item.annotation !== REMOVED_ANNOTATION);
			page.items.forEach((item: any) => item.annotation = null);
		});
		return parseResult;
	}


}
