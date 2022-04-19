// THIS IS ONLY TO PULL IN CSV CONVENIENTLY //
const fs = require("fs"); // for file i/o
const buffer = fs.readFileSync("gamehistory.csv"); // reading file into buffer
const myCSV = buffer.toString();

// Game engine class; we'll define methods on this and monitor state and run
// evals;
class Engine {
  // I'm going to use JSs ugly system of making private namespace, it is kind of
  // important that only private methods of Engine can actually alter state.
  // This will enforce such a rule, although not strictly necessary. If we want
  // OOP, we should do it right.
  #STATE;
  #DIMS;
  #VECS;
  constructor(pieces, history = []) {
    this.pieces = pieces;
    this.history = history;
    this.#DIMS = 15;
    this.#STATE = this.#initState();
    // The following set of vectors will indicate all unit movements.
    /*
      (-1,1)  (0,1)  (1,1)

      (-1,0)  (0,0)  (1,0)

      (-1,-1) (0,-1) (1,-1)
    */
    this.#VECS = [
      [-1,1], [0,1], [1,1], [-1,0],
      [1,0], [-1,-1], [0,-1], [1,-1]
    ];
  }

  #init2DArray() {
    // Simple routine to produce 2D array with all zeroes.
    // We will use this often, so let's just make an easy method to reference.
    return Array.from(Array(this.#DIMS), _ => Array(this.#DIMS).fill(0));
  }

  #initState() { // private methods only please.
    const newArray = this.#init2DArray();
    // We will indicate locations we have accessed with 1, -1 for opponent,
    // 0 will represent accessible cells. It is times like these that I wish
    // I had enumeration JS. TypeScript would be better here.
    this.history.forEach(entry => {
      const [x,y,pc] = entry;
      return newArray[x][y] = pc === this.pieces ? 1 : -1;
    });
    return newArray;
  }

  // UTILITY METHOD
  #isBounded(x,y) {
    // Handling board edges
    if(x < 0) return false;
    if (y < 0) return false;
    if (y >= this.#DIMS) return false;
    if (x >= this.#DIMS) return false;
    return true;
  }

  #computeChainLength(x,y) {
    let optimalLength = 0;
    this.#VECS.forEach(v => {
      const [dx,dy] = v;
      if (this.#isBounded(x+dx, y+dy) &&
	  this.#STATE[x][y] === 0 &&
	  this.#STATE[x+dx][y+dy] === 1)
      {
	optimalLength++;
      }
      return 0;
    });
    return optimalLength;
  }

  evalPosition() {
    // You can see how we would do this with a very ugly chaining of higher
    // order functions, but I think it obscures what is happening, so I will
    // instead elect to use a normal double for.
    // --- UNREADABLE ---
    // const newArray = this.#STATE.forEach((row, y) =>
    //   row.forEach((col,x) => console.log(`${x}, ${y} `, col)));
    // --- MORE READABLE ---
    let evalMatrix = this.#init2DArray();
    for (let y = 0; y < this.#DIMS; y++) {
      for (let x = 0; x < this.#DIMS; x++) {
	evalMatrix[x][y] = this.#computeChainLength(x,y);
      }
    }
    const tableColumns = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    console.table(evalMatrix, tableColumns);
  }

  // Just for my sanity, not necessary
  printState() {
    const tableColumns = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    console.table(this.#STATE, tableColumns);
  }
}

function parseCSV(string) {
  const parsed_string = string.split(",");
  // Note that in our return array, we take mvNum % 2 to encode white/black
  // player as either 0 or 1
  return parsed_string.map((coordStr, mvNum) =>
    [+coordStr.substring(0,2), +coordStr.substring(2,4), mvNum % 2]);
}

const winningMove = "0512"; // to remember

gameHistory = parseCSV(myCSV);
console.log("GAME HISTORY", gameHistory);

const ourEngine = new Engine(0, gameHistory);
ourEngine.printState();
ourEngine.evalPosition();
