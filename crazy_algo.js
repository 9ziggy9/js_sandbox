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

function modularFoldData(matrix) {
  // first we flatten the matrix into 1 dimension.
  const matrixFlat = matrix.reduce((F,M_y) => F = [...F, ...M_y], []);
  // we are interested in the size of subarrays, assuming they are
  // the same length we have.
  const s = matrix[0].length;
  let result = new Array(s).fill(0);
  // modulo operator makes us sum into result "buckets" around a ring.
  matrixFlat.forEach((x, i) => result[i % s] += x);
  return result;
}

const foldedData = foldData(data);
console.log(foldedData);

const modularFoldedData = modularFoldData(data);
console.log(modularFoldedData);
