import {linesToText} from './WordType';
// import LineItemBlock from '../LineItemBlock';
import {Enumify} from "enumify";

// An Markdown block
export default class BlockType extends Enumify {
	static H1 = {
		headline: true,
		headlineLevel: 1,
		toText(block: any) {
			return '# ' + linesToText(block.items, true);
		}
	}

	static H2 = {
		headline: true,
		headlineLevel: 2,
		toText(block: any) {
			return '## ' + linesToText(block.items, true);
		}
	}

	static H3 = {
		headline: true,
		headlineLevel: 3,
		toText(block: any) {
			return '### ' + linesToText(block.items, true);
		}
	}

	static H4 = {
		headline: true,
		headlineLevel: 4,
		toText(block: any) {
			return '#### ' + linesToText(block.items, true);
		}
	}

	static H5 = {
		headline: true,
		headlineLevel: 5,
		toText(block: any) {
			return '##### ' + linesToText(block.items, true);
		}
	}

	static H6 = {
		headline: true,
		headlineLevel: 6,
		toText(block: any) {
			return '###### ' + linesToText(block.items, true);
		}
	}

	static TOC = {
		mergeToBlock: true,
		toText(block: any) {
			return linesToText(block.items, true);
		}
	}

	static FOOTNOTES = {
		mergeToBlock: true,
		mergeFollowingNonTypedItems: true,
		toText(block: any) {
			return linesToText(block.items, false);
		}
	}

	static CODE = {
		mergeToBlock: true,
		toText(block: any) {
			return '```\n' + linesToText(block.items, true) + '```'
		}
	}

	static LIST = {
		mergeToBlock: true,
		mergeFollowingNonTypedItemsWithSmallDistance: true,
		toText(block: any) {
			return linesToText(block.items, false);
		}
	}

	static PARAGRAPH = {
		toText(block: any) {
			return linesToText(block.items, false);
		}
	}
}


export function isHeadline(type: any) {
	return type && type.name.length == 2 && type.name[0] === 'H'
}

export function blockToText(block: any) {
	if (!block.type) {
		return linesToText(block.items, false);
	}
	return block.type.toText(block);
}

export function headlineByLevel(level: number) {
	if (level == 1) {
		return BlockType.H1;
	} else if (level == 2) {
		return BlockType.H2;
	} else if (level == 3) {
		return BlockType.H3;
	} else if (level == 4) {
		return BlockType.H4;
	} else if (level == 5) {
		return BlockType.H5;
	} else if (level == 6) {
		return BlockType.H6;
	}
	throw "Unsupported headline level: " + level + " (supported are 1-6)";
}
