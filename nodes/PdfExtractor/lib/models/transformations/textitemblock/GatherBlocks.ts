import ToLineItemBlockTransformation from '../ToLineItemBlockTransformation';
import ParseResult from '../../ParseResult';
import LineItemBlock from '../../LineItemBlock';
import {DETECTED_ANNOTATION} from '../../Annotation';
import {minXFromPageItems} from '../../../pageItemFunctions';

// Gathers lines to blocks
export default class GatherBlocks extends ToLineItemBlockTransformation {

	constructor() {
		super("Gather Blocks");
	}

	transform(parseResult: any) {
		const {mostUsedDistance} = parseResult.globals;
		let createdBlocks = 0;
		let lineItemCount = 0;
		parseResult.pages.map((page: any) => {
			lineItemCount += page.items.length;
			const blocks: any[] = [];
			let stashedBlock = new LineItemBlock({});
			const flushStashedItems = () => {
				if (stashedBlock.items.length > 1) {
					stashedBlock.annotation = DETECTED_ANNOTATION;
				}

				blocks.push(stashedBlock);
				stashedBlock = new LineItemBlock({});
				createdBlocks++;
			};

			let minX = minXFromPageItems(page.items);
			page.items.forEach((item: any) => {
				if (minX && stashedBlock.items.length > 0 && shouldFlushBlock(stashedBlock, item, minX, mostUsedDistance)) {
					flushStashedItems();
				}
				stashedBlock.addItem(item);
			});
			if (stashedBlock.items.length > 0) {
				flushStashedItems();
			}
			page.items = blocks;
		});

		return new ParseResult({
			...parseResult,
			messages: ['Gathered ' + createdBlocks + ' blocks out of ' + lineItemCount + ' line items']
		});
	}

}

function shouldFlushBlock(stashedBlock: any, item: any, minX: number, mostUsedDistance: number) {
	if (stashedBlock.type && stashedBlock.type.mergeFollowingNonTypedItems && !item.type) {
		return false;
	}
	const lastItem = stashedBlock.items[stashedBlock.items.length - 1];
	const hasBigDistance = bigDistance(lastItem, item, minX, mostUsedDistance);
	if (stashedBlock.type && stashedBlock.type.mergeFollowingNonTypedItemsWithSmallDistance && !item.type && !hasBigDistance) {
		return false;
	}
	if (item.type !== stashedBlock.type) {
		return true;
	}
	if (item.type) {
		return !item.type.mergeToBlock;
	} else {
		return hasBigDistance;
	}
}


function bigDistance(lastItem: any, item: any, minX: number, mostUsedDistance: number) {
	const distance = lastItem.y - item.y;
	if (distance < 0 - mostUsedDistance / 2) {
		//distance is negative - and not only a bit
		return true;
	}
	let allowedDisctance = mostUsedDistance + 1;
	if (lastItem.x > minX && item.x > minX) {
		//intended elements like lists often have greater spacing
		allowedDisctance = mostUsedDistance + mostUsedDistance / 2;
	}
	if (distance > allowedDisctance) {
		return true;
	}
	return false;
}
