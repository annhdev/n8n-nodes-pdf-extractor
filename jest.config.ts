import type {Config} from 'jest';

export default async (): Promise<Config> => {
	return {
		roots: [
			"<rootDir>/nodes"
		],
		testMatch: [
			"**/__tests__/**/*.+(ts|js)",
			"**/?(*.)+(spec|test).+(ts|js)"
		],
		transform: {
			"^.+\\.(ts)$": ['ts-jest', { useESM: true }],
		},
		transformIgnorePatterns: [
			"/node_modules/(?!(pdfjs-dist|unpdf)/)"
		],
		verbose: true
	}
}
