import { useEffect, useState, useCallback } from "react";

// UI
import 'bootstrap/dist/css/bootstrap.min.css';
import '../filesUploader.sass';
import ValidateDocument from "../../public/ValidateDocument.jpg";
import { FaFileUpload } from "react-icons/fa";

// Services
import { ipfsService } from "../services/IpfsService.ts";
import { DocumentContractService } from "../services/DocumentContractService.ts";
import Header from "../components/Header.tsx";

interface UserFile {
  name: string;
  ipfsHash: string;
}

export default function Ownership() {
  const [hash, setHash] = useState<string | null>(null);
  const [userFile, setUserFile] = useState<UserFile>({
    name: '',
    ipfsHash: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hashParam = params.get('hash');

    setHash(hashParam);
  }, []);

  const contract = new DocumentContractService();

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const ipfsHash = await ipfsService.getIpfsHash(file);
      setUserFile({ name: file.name, ipfsHash });
    }
  }, []);

  const verifyDocument = useCallback(async () => {
    const isVerified = await contract.verifyDocument(userFile.ipfsHash);
    const verifiedText = isVerified ? "verified" : "unverified";
    console.log(`${userFile.ipfsHash} is ${verifiedText}`);
  }, [userFile.ipfsHash]);

  return (
    <>
      <Header />
      <section id="Ownership" className="p-5">
        <div className="container">
          <div className="justify-content-between">
            <div className="row">

              <div className="col-md-6">
                <h3>Verify Document</h3>
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
                        onClick={verifyDocument}
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>

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
                  src={ValidateDocument}
                  alt="Ownership Visual"
                  className="img-fluid"
                />

                <div className="px-3 pt-3 d-flex align-items-center justify-content-center">
                  <p className="lead text-center">
                    <span className="fs-6">
                      <span className="fs-6 fw-bold">NOTE:</span> Use the
                      <span className="fs-6 fst-italic fw-bold">"Verify Document"</span> feature to upload a file and check if it matches a previously registered hash on IPFS. This helps confirm the document's authenticity and ensures it hasn't been altered.
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
