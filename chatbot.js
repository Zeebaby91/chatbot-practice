import readline from 'node:readline';

// 1. OBJECTS & CONST: The "Brain" of the bot
const botConfig = {
  name: "Echo-ES6",
  version: "2.1.0",
  status: "Active"
};

// 2. MAP: High-performance command lookup
const commands = new Map([
  ['hello', 'System is online and healthy.'],
  ['joke', 'Why did the functions stop calling each other? Because they had too many arguments.'],
  ['help', 'Try: hello, joke, stats, filter, total, history, exit.']
]);

// 3. LET & SCOPE: Session state (History starts as an empty Array)
let sessionHistory = []; 

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

/**
 * 4. ARROW FUNCTIONS & ARRAY METHODS
 * This is your "Data Processing Pipeline"
 */

// Function to calculate analytics using Map, Filter, and Reduce
const analyzeSession = (data) => {
  // MAP: Create an array of just the character lengths
  const lengths = data.map(item => item.length);

  // FILTER: Find messages that are "Long" (more than 10 characters)
  const longMessages = data.filter(item => item.length > 10);

  // REDUCE: Sum up every single character typed so far
  const grandTotal = data.reduce((acc, item) => acc + item.length, 0);

  return { lengths, longMessages, grandTotal };
};

/**
 * 5. ASYNC: Handling User Input
 */
const handleInput = async (input) => {
  const query = input.toLowerCase().trim();
  
  // Create a message Object and add it to our history
  sessionHistory.push({ content: query, length: query.length, time: new Date() });

  // Logic Switching
  if (query === 'stats') {
    const { lengths, grandTotal } = analyzeSession(sessionHistory);
    console.log(`\x1b[36mBot:\x1b[0m Char lengths: [${lengths.join(', ')}]. Total Chars: ${grandTotal}`);
  } 
  else if (query === 'filter') {
    const { longMessages } = analyzeSession(sessionHistory);
    console.log(`\x1b[36mBot:\x1b[0m Found ${longMessages.length} long messages.`);
  }
  else if (query === 'history') {
    // FOREACH: Iterate for a clean report
    console.log("\n--- SESSION HISTORY ---");
    sessionHistory.forEach((m, i) => console.log(`${i + 1}: ${m.content}`));
  }
  else {
    const response = commands.get(query) ?? "I don't recognize that. Type 'help'.";
    console.log(`\x1b[36mBot:\x1b[0m ${response}`);
  }

  if (query === 'exit') return rl.close();
  ask();
};

const ask = () => rl.question('\x1b[32mYou:\x1b[0m ', handleInput);

console.log(`--- ${botConfig.name} v${botConfig.version} Ready ---`);
ask();