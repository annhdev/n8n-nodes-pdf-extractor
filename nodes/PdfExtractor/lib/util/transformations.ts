import CalculateGlobalStats from '../models/transformations/textitem/CalculateGlobalStats';
import CompactLines from '../models/transformations/lineitem/CompactLines';
import RemoveRepetitiveElements from '../models/transformations/lineitem/RemoveRepetitiveElements';
import VerticalToHorizontal from '../models/transformations/lineitem/VerticalToHorizontal';
import DetectTOC from '../models/transformations/lineitem/DetectTOC';
import DetectListItems from '../models/transformations/lineitem/DetectListItems';
import DetectHeaders from '../models/transformations/lineitem/DetectHeaders';

import GatherBlocks from '../models/transformations/textitemblock/GatherBlocks';
import DetectCodeQuoteBlocks from '../models/transformations/textitemblock/DetectCodeQuoteBlocks';
import DetectListLevels from '../models/transformations/textitemblock/DetectListLevels';
import ToTextBlocks from '../models/transformations/ToTextBlocks';
import ToMarkdown from '../models/transformations/ToMarkdown';
import ParseResult from "../models/ParseResult";


export const makeTransformations = (fontMap: any) => [
	new CalculateGlobalStats(fontMap),
	new CompactLines(),
	new RemoveRepetitiveElements(),
	new VerticalToHorizontal(),
	new DetectTOC(),
	new DetectHeaders(),
	new DetectListItems(),

	new GatherBlocks(),
	new DetectCodeQuoteBlocks(),
	new DetectListLevels(),

	new ToTextBlocks(),
	new ToMarkdown(),
]

export const transform = (pages: any, transformations: any) => {
	let parseResult = new ParseResult({pages})
	let lastTransformation: any;
	transformations.forEach((transformation: any) => {
		if (lastTransformation) {
			parseResult = lastTransformation.completeTransform(parseResult)
		}
		parseResult = transformation.transform(parseResult)
		lastTransformation = transformation
	})
	return parseResult
}
