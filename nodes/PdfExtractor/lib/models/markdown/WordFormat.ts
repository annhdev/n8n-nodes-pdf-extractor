import {Enumify} from 'enumify';

// The format of a word element
export default class WordFormat extends Enumify {
	static BOLD = {
		startSymbol: '**',
		endSymbol: '**',
	}
	static OBLIQUE = {
		startSymbol: '_',
		endSymbol: '_',
	}
	static BOLD_OBLIQUE = {
		startSymbol: '**_',
		endSymbol: '_**',
	}
}
