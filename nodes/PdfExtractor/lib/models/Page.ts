// A page which holds PageItems displayable via PdfPageView
export default class Page {
	index: any;
	items: any[];

	constructor(options: any) {
		this.index = options.index;
		this.items = options.items || []; //PageItem
	}

}
