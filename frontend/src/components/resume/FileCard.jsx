import { FaFilePdf, FaFileWord } from "react-icons/fa";
import "./Resume.css";

export default function FileCard({ file }) {

    if (!file) return null;

    const isPDF = file.name.toLowerCase().endsWith(".pdf");

    const size = (file.size / 1024).toFixed(2);

    return (

        <div className="file-card">

            <div className="file-icon">

                {isPDF ? <FaFilePdf /> : <FaFileWord />}

            </div>

            <div className="file-info">

                <h3>{file.name}</h3>

                <p>{isPDF ? "PDF Document" : "Word Document"}</p>

                <small>{size} KB</small>

            </div>

            <div className="file-status">

                ✔ Ready

            </div>

        </div>

    );

}