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

  #initState() { // private methods only please.
    const newArray = Array // initializing 2D array as zeroes quickly.
	  .from(Array(this.#DIMS), _ => Array(this.#DIMS).fill(0));
    // We will indicate locations we have accessed with 1, -1 for opponent,
    // 0 will represent accessible cells. It is times like these that I wish
    // I had enumeration JS. TypeScript would be better here.
    this.history.forEach(entry => {
      const [x,y,pc] = entry;
      return newArray[x][y] = pc === this.pieces ? 1 : -1;
    });
    return newArray;
  }

  evalPosition() {
    const newArray = this.#STATE.forEach((row, y) =>
      row.forEach((col,x) => console.log(`${x}, ${y} `, col)));
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
