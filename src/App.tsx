import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
//Pages
import MainPage from './layouts/MainPage.tsx'
import UploadFile from './layouts/UploadFile.tsx'
import VerifyFile from './layouts/VerifyFile.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/verify" element={<VerifyFile />} />
      </Routes>
    </Router>
  )
}

export default App
