// src/types.d.ts
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string }) => Promise<any>;
  on: (event: string, callback: (...args: any[]) => void) => void;
  removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};