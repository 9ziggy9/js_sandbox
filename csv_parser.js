// simple coordinate parsing for a game grid using csv

const response = "0001,0112,0819,0219,0413,1313,1217";

function parseCSV(string) {
  const parsed_string = string.split(",");
  // Note that in our return array, we take mvNum % 2 to encode white/black
  // player as either 0 or 1
  return parsed_string.map((coordStr, mvNum) =>
    [+coordStr.substring(0,2), +coordStr.substring(2,4), mvNum % 2]);
}

const replayGame = game => game.forEach(move => {
  const [x,y,player] = move;
  console.log(`Player ${player ? 'black' : 'white'} moved on space (${x}, ${y})`);
});

const myGame = parseCSV(response);

replayGame(myGame);

function newS

// Not implemented here is a procedure to pack an array of moves constructed in
// frontend memory into a csv string suitable to be saved in the DB. I leave that
// to you. :)

