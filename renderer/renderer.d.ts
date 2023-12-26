import { IpcRenderer } from "electron";
import { Storage as TsStorage } from "typescript";

export const OVERWRITE = "overwrite";
export const LAST_IMAGE_PATH = "lastImagePath";
export const LAST_FOLDER_PATH = "lastFolderPath";
export const LAST_FOLDER_OUTPUT_PATH = "lastFolderOutputPath";

export const LocalStorageKeys = {
  overwrite: Boolean,
  lastImagePath: String,
  lastFolderPath: String,
  lastFolderOutputPath: String
};

export interface IElectronAPI {
  on: (command, func?) => IpcRenderer;
  send: <T>(command, func?: T) => IpcRenderer;
  invoke: <T extends string | number | boolean | object>(command, func?) => T | Promise<T>;
  platform: "mac" | "win" | "linux";
}

type LocalStorageKeys = typeof LocalStorageKeys;

type LocalStorageItemKey = keyof LocalStorageKeys;

type LocalStorageItem<T extends LocalStorageItemKey> = LocalStorageKeys[T];

declare global {
  interface Storage extends TsStorage {
    getItem: <T extends LocalStorageItemKey>(key: T) => LocalStorageItem<T>;
    removeItem(key: T): LocalStorageItem<T>;
  }

  interface Window {
    electron: IElectronAPI;
    localStorage: Storage;
  }
}
