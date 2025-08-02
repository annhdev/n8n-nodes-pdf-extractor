import ToLineItemTransformation from '../ToLineItemTransformation';
import ParseResult from '../../ParseResult';
import {DETECTED_ANNOTATION} from '../../Annotation';
import BlockType from '../../markdown/BlockType';
import {headlineByLevel} from '../../markdown/BlockType';
import {isListItem} from '../../../stringFunctions';

//Detect headlines based on heights
export default class DetectHeaders extends ToLineItemTransformation {

	constructor() {
		super("Detect Headers");
	}

	transform(parseResult: any) {
		const {
			tocPages,
			headlineTypeToHeightRange,
			mostUsedHeight,
			mostUsedDistance,
			mostUsedFont,
			maxHeight
		} = parseResult.globals;
		const hasToc = tocPages.length > 0;
		let detectedHeaders = 0;

		// Handle title pages
		const pagesWithMaxHeight = findPagesWithMaxHeight(parseResult.pages, maxHeight);
		const min2ndLevelHeaderHeigthOnMaxPage = mostUsedHeight + ((maxHeight - mostUsedHeight) / 4);
		pagesWithMaxHeight.forEach((titlePage: any) => {
			titlePage.items.forEach((item: any) => {
				const height = item.height;
				if (!item.type && height > min2ndLevelHeaderHeigthOnMaxPage) {
					if (height == maxHeight) {
						item.type = BlockType.H1;
					} else {
						item.type = BlockType.H2;
					}
					item.annotation = DETECTED_ANNOTATION;
					detectedHeaders++;
				}
			});
		});

		if (hasToc) { //Use existing headline heights to find additional headlines
			const headlineTypes = Object.keys(headlineTypeToHeightRange);
			headlineTypes.forEach(headlineType => {
				let range = headlineTypeToHeightRange[headlineType];
				if (range.max > mostUsedHeight) { //use only very clear headlines, only use max
					parseResult.pages.forEach((page: any) => {
						page.items.forEach((item: any) => {
							if (!item.type && item.height == range.max) {
								item.annotation = DETECTED_ANNOTATION;
								item.type = BlockType.enumValueOf(headlineType);
								detectedHeaders++
							}
						});
					});
				}

			});
		} else { //Categorize headlines by the text heights
			const heights: any[] = [];
			let lastHeight;
			parseResult.pages.forEach((page: any) => {
				page.items.forEach((item: any) => {
					if (!item.type && item.height > mostUsedHeight && !isListItem(item.text())) {
						if (!heights.includes(item.height) && (!lastHeight || lastHeight > item.height)) {
							heights.push(item.height);
						}
					}
				});
			});
			heights.sort((a, b) => b - a);

			heights.forEach((height, i) => {
				const headlineLevel = i + 2;
				if (headlineLevel <= 6) {
					const headlineType = headlineByLevel(2 + i);
					parseResult.pages.forEach((page: any) => {
						page.items.forEach((item: any) => {
							if (!item.type && item.height == height && !isListItem(item.text())) {
								detectedHeaders++;
								item.annotation = DETECTED_ANNOTATION;
								item.type = headlineType;
							}
						});
					});
				}
			});
		}

		//find headlines which have paragraph height
		let smallesHeadlineLevel = 1;
		parseResult.pages.forEach((page: any) => {
			page.items.forEach((item: any) => {
				if (item.type && item.type.headline) {
					smallesHeadlineLevel = Math.max(smallesHeadlineLevel, item.type.headlineLevel);
				}
			});
		});
		if (smallesHeadlineLevel < 6) {
			const nextHeadlineType = headlineByLevel(smallesHeadlineLevel + 1);
			parseResult.pages.forEach((page: any) => {
				let lastItem: any;
				page.items.forEach((item: any) => {
					if (!item.type
						&& item.height == mostUsedHeight
						&& item.font !== mostUsedFont
						&& (!lastItem || lastItem.y < item.y || (lastItem.type && lastItem.type.headline) || (lastItem.y - item.y > mostUsedDistance * 2))
						&& item.text() === item.text().toUpperCase()
					) {
						detectedHeaders++;
						item.annotation = DETECTED_ANNOTATION;
						item.type = nextHeadlineType;
					}
					lastItem = item;
				});
			});
		}


		return new ParseResult({
			...parseResult,
			messages: [
				'Detected ' + detectedHeaders + ' headlines.',
			]
		});

	}

}

function findPagesWithMaxHeight(pages: any, maxHeight: any) {
	const maxHeaderPagesSet = new Set();
	pages.forEach((page: any) => {
		page.items.forEach((item: any) => {
			if (!item.type && item.height == maxHeight) {
				maxHeaderPagesSet.add(page);
			}
		});
	});
	return maxHeaderPagesSet;
}

