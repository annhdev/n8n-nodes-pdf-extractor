const MIN_DIGIT_CHAR_CODE = 48
const MAX_DIGIT_CHAR_CODE = 57
const WHITESPACE_CHAR_CODE = 32
const TAB_CHAR_CODE = 9
const DOT_CHAR_CODE = 46

export const removeLeadingWhitespaces = function removeLeadingWhitespaces(string: string) {
	while (string.charCodeAt(0) === WHITESPACE_CHAR_CODE) {
		string = string.substring(1, string.length)
	}
	return string
}

export const removeTrailingWhitespaces = function removeTrailingWhitespaces(string: string) {
	while (string.charCodeAt(string.length - 1) === WHITESPACE_CHAR_CODE) {
		string = string.substring(0, string.length - 1)
	}
	return string
}

export const isDigit = function isDigit(charCode: number) {
	return charCode >= MIN_DIGIT_CHAR_CODE && charCode <= MAX_DIGIT_CHAR_CODE
}

export const isNumber = function isNumber(string: string) {
	for (let i = 0; i < string.length; i++) {
		const charCode = string.charCodeAt(i)
		if (!exports.isDigit(charCode)) {
			return false
		}
	}
	return true
}

export const hasOnly = function hasOnly(string: string, char: string) {
	const charCode = char.charCodeAt(0)
	for (let i = 0; i < string.length; i++) {
		const aCharCode = string.charCodeAt(i)
		if (aCharCode !== charCode) {
			return false
		}
	}
	return true
}

export const hasUpperCaseCharacterInMiddleOfWord = function hasUpperCaseCharacterInMiddleOfWord(text: string) {
	let beginningOfWord = true
	for (let i = 0; i < text.length; i++) {
		const character: any = text.charAt(i)
		if (character === ' ') {
			beginningOfWord = true
		} else {
			if (!beginningOfWord && isNaN(character * 1) && character === character.toUpperCase() && character.toUpperCase() !== character.toLowerCase()) {
				return true
			}
			beginningOfWord = false
		}
	}
	return false
}

// Remove whitespace/dots + to uppercase
export const normalizedCharCodeArray = function normalizedCharCodeArray(string: string) {
	string = string.toUpperCase()
	return exports.charCodeArray(string).filter((charCode: any) => charCode !== WHITESPACE_CHAR_CODE && charCode !== TAB_CHAR_CODE && charCode !== DOT_CHAR_CODE)
}

export const charCodeArray = function charCodeArray(string: string) {
	const charCodes = []
	for (let i = 0; i < string.length; i++) {
		charCodes.push(string.charCodeAt(i))
	}
	return charCodes
}

export const prefixAfterWhitespace = function prefixAfterWhitespace(prefix: string, string: string) {
	if (string.charCodeAt(0) === WHITESPACE_CHAR_CODE) {
		string = exports.removeLeadingWhitespaces(string)
		return ' ' + prefix + string
	} else {
		return prefix + string
	}
}

export const suffixBeforeWhitespace = function suffixBeforeWhitespace(string: string, suffix: string) {
	if (string.charCodeAt(string.length - 1) === WHITESPACE_CHAR_CODE) {
		string = exports.removeTrailingWhitespaces(string)
		return string + suffix + ' '
	} else {
		return string + suffix
	}
}

export const isListItemCharacter = function isListItemCharacter(string: string) {
	if (string.length > 1) {
		return false
	}
	const char = string.charAt(0)
	return char === '-' || char === '•' || char === '–'
}

export const isListItem = function isListItem(string: string) {
	return /^[\s]*[-•–][\s].*$/g.test(string)
}

export const isNumberedListItem = function isNumberedListItem(string: string) {
	return /^[\s]*[\d]*[.][\s].*$/g.test(string)
}

export const wordMatch = function wordMatch(string1: string, string2: string) {
	const words1 = new Set(string1.toUpperCase().split(' '))
	const words2 = new Set(string2.toUpperCase().split(' '))
	const intersection = new Set(
		[...words1].filter(x => words2.has(x)))
	return intersection.size / Math.max(words1.size, words2.size)
}
