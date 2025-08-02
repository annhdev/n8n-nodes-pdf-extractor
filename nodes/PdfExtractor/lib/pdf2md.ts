import {parse} from './util/pdf';
import {makeTransformations, transform} from './util/transformations';


export default async function (pdfBuffer: Buffer, callbacks?: any) {
	const result = await parse(pdfBuffer, callbacks)
	const {fonts, pages} = result
	const transformations = makeTransformations(fonts.map)
	const parseResult = transform(pages, transformations)
	let markdown = parseResult.pages
		.map((page: any) => page.items.join('\n') + '\n')
		.join('')
	let text = pages.map((page: any) => page.items.map((item: any) => item.text).join('') + '\n').join('')

	return [markdown, text]
}
