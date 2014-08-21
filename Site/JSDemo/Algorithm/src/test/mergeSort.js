function mergeSort(arr) {
	var len = arr.length;
	if (len > 1) {
		var middle = Math.floor(len / 2);
		var left = arr.slice(0, middle);
		var right = arr.slice(middle);

		mergeSort(left);
		mergeSort(right);

		merge(left, right, arr);

	}
}

function merge(left, right, source) {
	var i = 0;
	var j = 0;
	var k = 0;
	while (i < left.length && j < right.length) {
		if (left[i] < right[j]) { // 此处用降序比较
			source[k] = right[j];
			j++;
		} else {
			source[k] = left[i];
			i++;
		}
		// 总会有一笔数据添加到源中
		// 所以每次都要更新索引
		k++;
	}

	// 将会有剩些的一部分为添加到源中
	// 注意，这剩下的部分已经排序了
	if (i === left.length) { // 左部分已经排序完成了
		// 将右部分剩余的复制到左部分中
		// 由于右部分已经排序完成了
		// 此处直接复制就可以了
		while (j < right.length) {
			source[k] = right[j];
			k++;
			j++;
		}
	} else {
		while(i<left.length){
			source[k]=left[i];
			k++;
			i++;
		}
	}

}
