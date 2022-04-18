// Game engine class; we'll define methods on this and monitor state and run evals;
class Engine {
  // I'm going to use JSs ugly system of making private namespace,
  // it is kind of important that only private methods of Engine can
  // actually alter state. This will enforce such a rule, although not
  // strictly necessary. If we want OOP, we should do it right.
  #STATE;
  #DIMS;
  constructor(history = []) {
    this.history = history;
    this.#STATE = undefined;
    this.#DIMS = 15;
  }

  initState() {
    const newArray = Array.from(Array(this.#DIMS), _ => Array(this.#DIMS).fill(0));
    console.log(this.history);
    this.history.forEach(entry => newArray[entry[0]][entry[1]] = 1);
    this.#STATE = newArray;
    console.log(newArray);
    return this.#STATE;
  }

  // Just for my sanity, not necessary
  printState() {
    this.#STATE.forEach(row => console.log(`${row}`));
  }
}

function parseCSV(string) {
  const parsed_string = string.split(",");
  // Note that in our return array, we take mvNum % 2 to encode white/black
  // player as either 0 or 1
  return parsed_string.map((coordStr, mvNum) =>
    [+coordStr.substring(0,2), +coordStr.substring(2,4), mvNum % 2]);
}

const myCSV = "0909,1010,1009,0910,0809,\
		0709,1109,1209,0808,1110,\
		0810,1210,1310,0807,0811,\
		0812,1008,1107,0908,0708,\
		0711,0612,0611,0511,0710,\
		1007,0512";

gameHistory = parseCSV(myCSV);

const ourEngine = new Engine(gameHistory);
ourEngine.initState();
ourEngine.printState();
