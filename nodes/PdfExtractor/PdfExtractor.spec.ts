import pdf2md from './lib/pdf2md';
import fs from 'fs';
import path from 'path';

describe("Extract Markdown function", () => {
	const filePath = path.resolve(__dirname, '../../test.pdf'); // Replace with your PDF file path


	it("should extract markdown from a PDF buffer", async () => {
		const pdfBuffer = fs.readFileSync(filePath);
		const [markdown, text] = await pdf2md(pdfBuffer);
		expect(markdown).toBeDefined();
		expect(typeof markdown).toBe("string");
		expect(text).toBeDefined();
		expect(typeof text).toBe("string");
	});

})
