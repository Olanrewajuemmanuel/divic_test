/**
 * This file explains the afterStart hook
 */

import { registerHook, runHooks } from "../index";

async function beforeMigrateFunction1() {
  console.log("Before Migration Checker 1...");
}

async function beforeMigrateFunction2() {
  console.log("Before Migration Checker 2...");
}

async function beforeMigrateFunction3() {
  console.log("Before Migration Checker 3...");
}

// Register each function as hooks
registerHook("beforeMigrate", beforeMigrateFunction1);
registerHook("beforeMigrate", beforeMigrateFunction2);
registerHook("beforeMigrate", beforeMigrateFunction3);

async function migrateDB() {
  // Run the hooks
  await runHooks("beforeMigrate");

  // Database migration logic...
  console.log("Database migrated");
}

migrateDB(); // Migrate the database
