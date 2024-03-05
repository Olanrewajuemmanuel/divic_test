export type HookFunction = () => Promise<void>;

export interface Hooks {
  afterStart: HookFunction[];
  beforeMigrate: HookFunction[];
  afterMigrate: HookFunction[];
}

const hooks: Hooks = {
  afterStart: [],
  beforeMigrate: [],
  afterMigrate: [],
};

export function registerHook(hookName: keyof Hooks, callback: HookFunction) {
  hooks[hookName].push(callback);
}

export async function runHooks(hookName: keyof Hooks) {
  const hookFunctions = hooks[hookName];
  for (const hookFunction of hookFunctions) {
    await hookFunction(); // await each hook function
  }
}
