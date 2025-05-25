import React, { useState, useRef } from "react";

// UI
import 'bootstrap/dist/css/bootstrap.min.css';
import '../filesUploader.sass';
import OwnershipAsset from "../../public/UploadDocument.jpg";
import { FaFileUpload } from "react-icons/fa";

// Services
import '../services/IpfsService.ts';
import { ipfsService } from "../services/IpfsService.ts";
import { DocumentContractService } from "../services/DocumentContractService.ts";
import Header from "../components/Header.tsx";

interface UserFile {
  name: string;
  ipfsHash: string;
}

export default function Ownership() {
  const [userFile, setUserFile] = useState<UserFile>({
    name: '',
    ipfsHash: ''
  });

  const contractRef = useRef(new DocumentContractService());

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const ipfsHash = await ipfsService.getIpfsHash(file);

      setUserFile({
        name: fileName,
        ipfsHash: ipfsHash,
      });
    }
  }

  async function uploadFile() {
    const ipfsHash = userFile.ipfsHash;
    if (!ipfsHash) return;

    await contractRef.current.connectWallet();
    await contractRef.current.uploadDocument(ipfsHash);
  }

  async function verifyDocument(ipfsHash: string) {
    const isVerifiedDocument = await contractRef.current.verifyDocument(ipfsHash);
    const verifiedText = isVerifiedDocument ? "verified" : "unverified";
    console.log(`${ipfsHash} is ${verifiedText}`);
  }

  return (
    <>
      <Header />
      <section id="Ownership" className="p-5">
        <div className="container">
          <div className="justify-content-between">
            <div className="row">

              <div className="col-md-6">
                {/* File Uploader */}
                <h3>File Uploader</h3>
                <div className="pb-3">
                  <form name="checkOwnershipForm">
                    <div className="form-group files row mx-1">
                      <input
                        className="form-control"
                        id="formFile"
                        type="file"
                        required
                        onChange={handleFileUpload}
                      />
                      <FaFileUpload className="upload-icon" />
                    </div>
                    <div className="row mx-5 py-3">
                      <button
                        type="button"
                        className="btn btn-outline-primary col-6 mx-auto"
                        onClick={uploadFile}
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>

                {/* File Info */}
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
                        <td className="text-break">{userFile.name}</td>
                      </tr>
                      <tr>
                        <td>IPFS Hash</td>
                        <td className="text-break">{userFile.ipfsHash}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center">
                <img
                  src={OwnershipAsset}
                  alt="Ownership Visual"
                  className="img-fluid"
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
