import { Component } from "react";

// UI
import 'bootstrap/dist/css/bootstrap.min.css';
import '../filesUploader.sass';
import OwnershipAsset from "../../public/Docements.jpeg";
import { FaFileUpload } from "react-icons/fa";

// Services
import '../services/IpfsService.ts';
import { ipfsService } from "../services/IpfsService.ts";
import { DocumentContractService } from "../services/DocumentContractService.ts"
import Header from "./Header.tsx";

interface UserFile {
  name: string;
  ipfsHash: string;
}

interface OwnershipState {
  userFile: UserFile;
}

class Ownership extends Component<{}, OwnershipState> {

  private contract: DocumentContractService;

  constructor(props: {}) {
    super(props);

    this.contract = new DocumentContractService();

    this.state = {
      userFile: {
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

      this.setState({
        userFile: {
          name: fileName,
          ipfsHash: ipfsHash,
        }
      });
    }
  };

  async uploadFile() {
    const ipfsHash: string = this.state.userFile.ipfsHash;

    if (!ipfsHash) return;

    await this.contract.connectWallet();
    await this.contract.uploadDocument(ipfsHash);
  }

  async verifyDocument(ipfsHash: string) {
    const isVerifiedDocument: Boolean = await this.contract.verifyDocument(ipfsHash);
    const verifiedText: string = isVerifiedDocument ? "verified" : "unverified";

    console.log(`${ipfsHash} is ${verifiedText}`);
  }

  render() {
    return (
      <>
        <Header />
        <section id="Ownership" className="p-5">
          <div className="container">
            <div className="justify-content-between">
              <div className="row">

                <div className="col-md-6">

                  {/* Check File Ownership */}
                  <h3>File Uploader</h3>
                  <div className="pb-3">
                    <form name="checkOwnershipForm">
                      <div className="form-group files row mx-1">
                        <input
                          className="form-control"
                          id="formFile"
                          type="file"
                          required
                          onChange={this.handleFileUpload} />
                        <FaFileUpload className="upload-icon" />
                      </div>
                      <div className="row mx-5 py-3">
                        <button
                          type="button"
                          className="btn btn-outline-primary col-6 mx-auto"
                          onClick={this.uploadFile}>Upload</button>
                      </div>
                    </form>
                  </div>

                  {/* Live Transaction Log*/}
                  <div className="pb-3">
                    <h3>File Info</h3>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Property</th>
                          <th scope="col">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>File Name</td>
                          <td className="text-break">{this.state.userFile.name}</td>
                        </tr>
                        <tr>
                          <td>IPFS Hash</td>
                          <td className="text-break">{this.state.userFile.ipfsHash}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
                  <img
                    src={OwnershipAsset}
                    alt="Ownership Visual"
                    className="img-fluid rounded shadow-sm mb-3"
                  />

                  <div className="px-3 pt-3 d-flex align-items-center justify-content-center">
                    <p className="lead text-center">
                      <span className="fs-6">
                        <span className="fs-6 fw-bold">NOTE:</span> In the
                        <span className="fs-6 fst-italic fw-bold">"File Uploader"</span> section, you can upload a file to generate its hash and store it on IPFS for ownership verification.
                      </span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Ownership;
