import * as Hash from 'typestub-ipfs-only-hash'

interface IIpfsService {
  getIpfsHash(file: File): Promise<string>;
}

class IpfsService implements IIpfsService {

  async getIpfsHash(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const response = new Response(arrayBuffer);
    const text = await response.text();

    const hash = await Hash.of(text);

    return hash;
  }
}

export const ipfsService = new IpfsService();
