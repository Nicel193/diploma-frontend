import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './MainPage.sass';
import Header from "./Header.tsx";

// Import your images (replace with actual image paths)
import diningImage from '../../public/UploadDocument.jpg';
import livingImage from '../../public/ValidateDocument.jpg';

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="text-center mb-5">
                    <h1 className="display-4">Browse The Service</h1>
                    <p className="lead text-muted">True security means your documents stay private, intact, and trusted - no matter who tries to peek or pry</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-md-10 ">
                        <hr className="my-4" />
                        
                        <div className="row mt-5 justify-content-center">
                            <div className="col-md-4 text-center category-item" onClick={() => navigate("/upload")}>
                                <div className="category-image-container mb-3">
                                    <img 
                                        src={diningImage} 
                                        alt="Dining" 
                                        className="img-fluid rounded category-image"
                                    />
                                </div>
                                <h3><strong>Upload File</strong></h3>
                            </div>
                            
                            <div className="col-md-4 text-center category-item" onClick={() => navigate("/verify")}>
                                <div className="category-image-container mb-3">
                                    <img 
                                        src={livingImage} 
                                        alt="Living" 
                                        className="img-fluid rounded category-image"
                                    />
                                </div>
                                <h3><strong>Verify File</strong></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}