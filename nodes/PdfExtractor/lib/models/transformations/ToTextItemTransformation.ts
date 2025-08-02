
import Transformation from './Transformation';
import TextItem from '../TextItem';
// import TextItemPageView from '../../components/debug/TextItemPageView';
import {REMOVED_ANNOTATION} from '../Annotation';

// Abstract class for transformations producing TextItem(s) to be shown in the TextItemPageView
export default class ToTextItemTransformation extends Transformation {
	showWhitespaces: boolean;

	constructor(name: any) {
		super(name, TextItem.name);
		if (this.constructor === ToTextItemTransformation) {
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
