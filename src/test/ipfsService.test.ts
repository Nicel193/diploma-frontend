import { ipfsService } from '../services/IpfsService';

describe('IpfsService', () => {
  it('should return IPFS hash for a file', async () => {
    const fileContent = 'Test content for IPFS';
    const mockHash = 'QmV6wv18jLXLHtLEPp4ViGXSNZohVjr4jQ88CYt89W5Hhs';

    const file = new File([fileContent], '../../public/Logo.png', { type: 'image/png' });

    const result = await ipfsService.getIpfsHash(file);

    expect(result).toBe(mockHash);
  });
});