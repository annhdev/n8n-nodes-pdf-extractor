import PageItem from './PageItem'

//A text item, i.e. a line or a word within a page
export default class TextItem extends PageItem {
	x: any;
	y: any;
	width: any;
	height: any;
	text: any;
	font: any;
	lineFormat: any;
	unopenedFormat: any;
	unclosedFormat: any;

	constructor(options: any) {
		super(options);
		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.text = options.text;
		this.font = options.font;

		this.lineFormat = options.lineFormat;
		this.unopenedFormat = options.unopenedFormat;
		this.unclosedFormat = options.unclosedFormat;
	}
}
