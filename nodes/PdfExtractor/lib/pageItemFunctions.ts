export function minXFromBlocks(blocks: any) {
	let minX = 999;
	blocks.forEach((block: any) => {
		block.items.forEach((item: any) => {
			minX = Math.min(minX, item.x)
		});
	});
	if (minX == 999) {
		return null;
	}
	return minX;
}

export function minXFromPageItems(items: any) {
	let minX = 999;
	items.forEach((item: any) => {
		minX = Math.min(minX, item.x)
	});
	if (minX == 999) {
		return null;
	}
	return minX;
}

export function sortByX(items: any) {
	items.sort((a: any, b: any) => {
		return a.x - b.x;
	});
}

export function sortCopyByX(items: any) {
	const copy = items.concat();
	sortByX(copy);
	return copy;
}
