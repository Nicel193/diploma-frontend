import { Component } from "react";

// UI
import 'bootstrap/dist/css/bootstrap.min.css';
import '../filesUploader.sass';
import OwnershipAsset from "../assets/img/ownership.png";

// Services
import '../services/IpfsService.ts';
import { ipfsService } from "../services/IpfsService.ts";
import { DocumentContractService } from "../services/DocumentContractService.ts"

interface UserFile {
  name: string;
  ipfsHash: string;
}

interface OwnershipState {
  activeAccount: string;
  userFiles: UserFile;
}

class Ownership extends Component<{}, OwnershipState> {

  private contract: DocumentContractService;

  constructor(props: {}) {
    super(props);

    this.contract = new DocumentContractService();

    this.state = {
      activeAccount: 'Anonymous',
      userFiles: {
        name: '',
        ipfsHash: '',
      }
    };
  }

  handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileName = file.name;
      const ipfsHash = await ipfsService.getIpfsHash(file);

      await this.contract.connectWallet();
      await this.contract.uploadDocument(ipfsHash);

      this.verifyDocument(ipfsHash);
      this.verifyDocument("Test");

      this.setState({
        userFiles: {
          name: fileName,
          ipfsHash: ipfsHash,
        }
      });
    }
  };

  async verifyDocument(ipfsHash: string) {
    const isVerifiedDocument: Boolean = await this.contract.verifyDocument(ipfsHash);
    const verifiedText: string = isVerifiedDocument ? "verified" : "unverified";

    console.log(`${ipfsHash} is ${verifiedText}`);
  }

  render() {
    return (
      <section id="Ownership" className="p-5">
        <div className="container">
          <div className="justify-content-between">
            <div>
              <img src={OwnershipAsset} className="mx-auto d-block" alt="" width="20%" height="20%" />
            </div>

            <div className="px-3 d-flex align-items-center justify-content-center">
              <h1>File Ownership</h1>
            </div>

            <div className="px-3 pt-3 d-flex align-items-center justify-content-center">
              <p className="lead text-center">
                Check for file ownership and list your files.<br />
                <span className="fs-6">
                  <span className="fs-6 fw-bold">NOTE:</span> In
                  <span className="fs-6 fst-italic fw-bold"> Check File Ownership </span>
                  section, you can try to upload a file and we will match the hash with all the files stored on our IPFS.
                </span>
              </p>
            </div>

            <hr />

            <div className="py-3 d-flex align-items-center justify-content-center">
              <h2>Account: {this.state.activeAccount}</h2>
            </div>

            {/* Live Transaction Log*/}
            <div className="pb-3">
              <h3>Live Transaction Log</h3>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col" width="175">Property</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>File Name</td>
                    <td>{this.state.userFiles.name}</td>
                  </tr>
                  <tr>
                    <td>IPFS Hash</td>
                    <td>{this.state.userFiles.ipfsHash}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Check File Ownership */}
            <h3>Check Ownership</h3>
            <div className="pb-3">
              <form name="checkOwnershipForm">
                <div className="form-group files row mx-1">
                  <input className="form-control" id="formFile" type="file" onChange={this.handleFileUpload} required />
                </div>
                <div className="row mx-5 py-3">
                  <button type="button" className="btn btn-outline-primary col-6 mx-auto">Upload</button>
                </div>
              </form>
            </div>

            <hr />

            {/* Your Stored Files */}
            <h3>Your Stored Files</h3>
          </div>
        </div>
      </section>
    );
  }
}

export default Ownership;
