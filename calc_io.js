#!/usr/bin/node
import {createInterface} from 'readline';

function calc(arg1, arg2, op) {
  switch (op) {
    // addition
    case '+':
    case 'plus':
    case 'add':
    case 'sum': return arg1 + arg2;
    // multiplication
    case '*':
    case 'times':
    case 'mult':
    case 'multiply': return arg1 * arg2;
  }
}

function parse(string) {
  // needs more error handling, whatevs.
  try {
    const parsed = string.split(" ");
    if (parsed.length !== 3) throw new Error;
    return parsed;
  } catch {
    console.log('ERROR: malformed input');
    return [0,0,'+'];
  }
}

const printOut = (arg1, op, arg2) => console.log(calc(+arg1, +arg2, op));

const prompt = (stream) => new Promise((resolve) => {
    stream.question('>>> ', input => resolve(input));
})

async function calcRoutine() {
  const io = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  io.on('close', () => process.exit(0));
  let quit = false;
  while (!quit) {
    const input = await prompt(io);
    if (input === 'exit') io.close();
    printOut(...parse(input));
  }
}

calcRoutine();
