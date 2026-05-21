import { Platform } from "react-native";

export const AUTH_LOGGED_IN_KEY = "@lessyns:isLoggedIn";

let memoryAuthValue: string | null = null;

type StorageLike = {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
};

function getWebStorage(): StorageLike | null {
  if (Platform.OS !== "web") {
    return null;
  }

  if (typeof globalThis === "undefined" || !("localStorage" in globalThis)) {
    return null;
  }

  return {
    async setItem(key, value) {
      globalThis.localStorage.setItem(key, value);
    },
    async getItem(key) {
      return globalThis.localStorage.getItem(key);
    },
    async removeItem(key) {
      globalThis.localStorage.removeItem(key);
    },
  };
}

function getNativeAsyncStorage(): StorageLike | null {
  try {
    // Lazy require so missing native bindings do not crash app startup.
    const mod = require("@react-native-async-storage/async-storage");
    const storage = (mod?.default ?? mod) as Partial<StorageLike> | undefined;
    if (!storage?.setItem || !storage?.getItem || !storage?.removeItem) {
      return null;
    }
    return storage as StorageLike;
  } catch {
    return null;
  }
}

function getStorage(): StorageLike | null {
  return getWebStorage() ?? getNativeAsyncStorage();
}

export async function markLoggedIn() {
  const storage = getStorage();
  if (storage) {
    try {
      await storage.setItem(AUTH_LOGGED_IN_KEY, "true");
      return;
    } catch {
      // Fall through to memory fallback below.
    }
  }
  memoryAuthValue = "true";
}

export async function markLoggedOut() {
  const storage = getStorage();
  if (storage) {
    try {
      await storage.removeItem(AUTH_LOGGED_IN_KEY);
      memoryAuthValue = null;
      return;
    } catch {
      // Fall through to memory fallback below.
    }
  }
  memoryAuthValue = null;
}

export async function isLoggedIn() {
  const storage = getStorage();
  if (storage) {
    try {
      const value = await storage.getItem(AUTH_LOGGED_IN_KEY);
      return value === "true";
    } catch {
      // Fall through to memory fallback below.
    }
  }

  const value = memoryAuthValue;
  return value === "true";
}
