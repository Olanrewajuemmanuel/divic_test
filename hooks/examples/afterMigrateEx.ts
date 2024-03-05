/**
 * This file explains the afterStart hook
 */

import { registerHook, runHooks } from "../index";

async function afterMigrateFunction1() {
  console.log("After Migration Checker 1...");
}

async function afterMigrateFunction2() {
  console.log("After Migration Checker 2...");
}

async function afterMigrateFunction3() {
  console.log("After Migration Checker 3...");
}

// Register each function as hooks
registerHook("afterMigrate", afterMigrateFunction1);
registerHook("afterMigrate", afterMigrateFunction2);
registerHook("afterMigrate", afterMigrateFunction3);

async function migrateDB() {
  // Database migration logic...

  // Run the hooks
  await runHooks("afterMigrate");
}

migrateDB(); // Migrate the database
