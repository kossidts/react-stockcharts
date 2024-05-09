function weakSortMemoFactory() {
	const cache = new Map();
	return (data, sortkey) => {
		if (!Array.isArray(data)) {
			return data;
		}
		let key = `key-${data.length}`;
		if (sortkey) {
			key += `-${JSON.stringify(data[0][sortkey])}`;
			key += `-${JSON.stringify(data[data.length - 1][sortkey])}`;
			key += `-${JSON.stringify(data[Math.round(data.length / 2)][sortkey])}`;
		} else {
			key += `-${JSON.stringify(data[0])}`;
			key += `-${JSON.stringify(data[data.length - 1])}`;
			key += `-${JSON.stringify(data[Math.round(data.length / 2)])}`;
		}

		if (!cache.has(key)) {
			console.log("Momo sorting", key);
			if (sortkey) {
				cache.set(
					key,
					data.slice().sort((a, b) => a[sortkey] - b[sortkey])
				);
			} else {
				cache.set(
					key,
					data.slice().sort((a, b) => a - b)
				);
			}
		}
		return cache.get(key);
	};
}
export const weakSortMemo = weakSortMemoFactory();
// const data = unsortedData.slice().sort((a, b) => a.income - b.income);
// const data = weakSortMemo(unsortedData, "income");
