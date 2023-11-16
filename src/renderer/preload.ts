// src/preload.ts

// `contextBridge` expose an API to the renderer process.
// `ipcRenderer` is used for IPC (inter-process communication) with main process.
// We use it in the preload instead of renderer in order to expose only
// whitelisted wrappers to increase the security of our application.
import { contextBridge, ipcRenderer } from 'electron';

// Create a type that should contain all the data we need to expose in the
// renderer process using `contextBridge`.
export type ContextBridgeApi = {
  sendMessage: (message: string | undefined) => Promise<string>;
};

const exposedApi: ContextBridgeApi = {
  sendMessage: (message) => {
    // <-- send to backend (main.ts)
    ipcRenderer.send('get-message', message);

    // --> send to front end (App.tsx)
    return new Promise((resolve) => {
      ipcRenderer.once('get-message-success', (_event, data: string) =>
        resolve(data),
      );
    });
  },
};

// Expose our functions in the `api` namespace of the renderer `Window`.
contextBridge.exposeInMainWorld('api', exposedApi);
