import { ethers, Contract, ContractTransactionResponse, EventLog } from 'ethers';
import abiContract from '../../contract/FilesStore.json';

export interface DocumentUploadedEvent {
  user: string;
  hash: string;
  ipfsHash: string;
  event: EventLog;
}

export class DocumentContractService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.JsonRpcSigner;
  private contract: Contract;
  private contractAddress: string;
  private abi: any;

  constructor() {
    this.contractAddress = "0xfE1aE556d11Ea7aef8A8Ec32EAF22B442e82e944";
    this.abi = abiContract;
    this.provider = {} as ethers.BrowserProvider;
    this.signer = {} as ethers.JsonRpcSigner;
    this.contract = {} as Contract;
  }

  async connectWallet(): Promise<void> {
    const ethereum = (window as any).ethereum;

    if (!ethereum) throw new Error('MetaMask is not installed');

    await ethereum.request({ method: 'eth_requestAccounts' });

    this.provider = new ethers.BrowserProvider(ethereum);
    this.signer = await this.provider.getSigner();
    this.contract = new Contract(this.contractAddress, this.abi, this.signer);
  }

  async uploadDocument(ipfsHash: string): Promise<string> {
    const tx: ContractTransactionResponse = await this.contract.uploadDocument(ipfsHash);
    await tx.wait();
    return tx.hash;
  }

  async verifyDocument(ipfsHash: string): Promise<boolean> {
    return await this.contract.verifyDocument(ipfsHash, this.signer.address);
  }

  async getDocumentByHash(hash: string): Promise<{ owner: string; ipfsHash: string }> {
    const result = await this.contract.documents(hash);
    return {
      owner: result[0],
      ipfsHash: result[1]
    };
  }

  onDocumentUploaded(callback: (event: DocumentUploadedEvent) => void): void {
    this.contract.on('DocumentUploaded', (user: string, hash: string, ipfsHash: string, event: EventLog) => {
      callback({ user, hash, ipfsHash, event });
    });
  }

  removeAllListeners(): void {
    this.contract.removeAllListeners('DocumentUploaded');
  }
}
