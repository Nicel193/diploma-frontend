import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
//Pages
import Main from './layouts/Main.tsx'
import UploadFile from './layouts/UploadFile.tsx'
import VerifyFile from './layouts/VerifyFile.tsx'
import Auth from "./layouts/Auth.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/verify" element={<VerifyFile />} />
      </Routes>
    </Router>
  )
}

export default App
