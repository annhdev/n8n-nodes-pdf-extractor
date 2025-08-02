export default class Word {
	string: any;
	type: any;
	format: any;

	constructor(options: any) {
		this.string = options.string;
		this.type = options.type; // WordType
		this.format = options.format; // WordFormat
	}

}
