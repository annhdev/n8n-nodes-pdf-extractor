import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError
} from "n8n-workflow";

import pdf2md from './lib/pdf2md';

export class PdfExtractor implements INodeType {
	description: INodeTypeDescription = {
		displayName: "PDF Extractor",
		name: "pdfExtractor",
		icon: "file:icon.svg",
		group: ["transform"],
		version: 1,
		description: "Extracts text and markdown from PDF files",
		defaults: {
			name: "PDF Extractor",
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [],
		properties: [
			{
				displayName: "Input Binary Field",
				name: "inputField",
				type: "string",
				default: "data",
				required: true,
				description: "The name of the input field containing the file data to be processed",
			},
			{
				displayName: "Output Format",
				name: "outputFormat",
				type: "options",
				options: [
					{name: "TXT", value: "txt"},
					{name: "Markdown", value: "markdown"},
					{name: "All", value: "all"},
				],
				default: "all",
				description: "The format to convert the PDF content into",
			},
			// Additional properties for each operation can be added here
		],
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const output: INodeExecutionData[] = [];
		const inputField = this.getNodeParameter("inputField", 0) as string;
		const outputFormat = this.getNodeParameter("outputFormat", 0) as string;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			const item = items[itemIndex];
			const binaryData = item.binary?.[inputField];

			if (!binaryData) {
				throw new NodeOperationError(this.getNode(), `No binary data found in field "${inputField}" for item ${itemIndex + 1}`);
			}

			try {
				const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, inputField);

				const [markdown, textContent] = await pdf2md(buffer);

				switch (outputFormat) {
					case "txt":
						output.push({
							json: {
								textContent,
							},
							pairedItem: {item: itemIndex}
						});
						break;
					case "markdown":
						output.push({
							json: {
								markdown,
							},
							pairedItem: {item: itemIndex}
						});
						break;
					case "all":
						// For markdown, we can use HTML as a base and convert it to markdown
						output.push({
							json: {
								textContent,
								markdown,
							},
							pairedItem: {item: itemIndex}
						});
						break;
					default:
						break;
				}
			} catch (error) {
				if (this.continueOnFail()) {
					output.push({json: {error: error.message}, pairedItem: {item: itemIndex}});
				} else {
					throw error;
				}
			}
		}
		return this.prepareOutputData(output);
	}

}

