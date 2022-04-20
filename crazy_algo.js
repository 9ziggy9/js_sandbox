const arr1 = [2,4,5,6,7,8];
const arr2 = [1,0,6,1,2,5];
const arr3 = [9,8,7,4,5,2];
const data = [arr1,arr2,arr3];

function foldData(matrix) {
  // we need to reduce over VERTICAL indices, in order to do this conveniently,
  // we have to take a matrix transpose.
  const result = new Array(matrix[0].length).fill(0);
  const matrixTranspose = matrix[0].map((_,x) => matrix.map(m_y => m_y = m_y[x]));
  // we then map elements of results array into sum over columns of matrix.
  return result.map((a,u) => matrixTranspose[u].reduce((a, v) => a + v));
}

const foldedData = foldData(data);
console.log(foldedData);
