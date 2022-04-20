const cryptA1 = [
  [159169, 12.99],
  [935281, 19.99],
  [936282, 0.24],
  [148968, 4.59],
];

const cryptA2 = [
  [159169, 93.99],
  [935281, 1.99],
  [936282, 8.24],
  [148968, 4.59],
];

const cryptA3 = [
  [159169, 12.99],
  [935281, 19.99],
  [936282, 99.24],
  [148968, 4.09],
];

const historyArr = [];
historyArr.push(cryptA3);
historyArr.push(cryptA2);
historyArr.push(cryptA1);
console.log(historyArr);

const priceHistories = historyArr
      .map(cryptoHistory => cryptoHistory.map(x => x[1]));

let portfolioHistory = new Array(priceHistories[0].length).fill(0);

portfolioHistory = [...portfolioHistory
		    .map((_,i) => priceHistories
			 .reduce((sum,)))];

console.log(portfolioHistory);
