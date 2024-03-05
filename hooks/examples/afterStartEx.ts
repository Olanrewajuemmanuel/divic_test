/**
 * This file explains the afterStart hook
 */

import { registerHook, runHooks } from "../index";

async function afterStartFunction1() {
  console.log("Logger is online...");
}

async function afterStartFunction2() {
  console.log("DB is connecting...");
}

async function afterStartFunction3() {
  console.log("Running after check 1 and 2");
}

// Register each function as hooks
registerHook("afterStart", afterStartFunction1);
registerHook("afterStart", afterStartFunction2);
registerHook("afterStart", afterStartFunction3);

async function startApp() {
  /**
   * Application code logic...
   * ...
   * */

  // Run the hooks
  await runHooks("afterStart");
}

startApp(); // Start server
