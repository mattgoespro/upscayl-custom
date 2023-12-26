import { ipcRenderer, contextBridge } from "electron";
import { getPlatform } from "./utils/get-device-specs";

// 'ipcRenderer' will be available in index.js with the method 'window.electron'
contextBridge.exposeInMainWorld("electron", {
  send: (command: string, payload: unknown) => ipcRenderer.send(command, payload),
  on: (command: string, func: (...args: unknown[]) => unknown) =>
    ipcRenderer.on(command, (event, args) => {
      func(event, args);
    }),
  invoke: (command: string, payload: unknown) => ipcRenderer.invoke(command, payload),
  platform: getPlatform()
});
