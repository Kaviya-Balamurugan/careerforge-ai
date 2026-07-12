import { useDropzone } from "react-dropzone";
import "./Resume.css";

export default function UploadBox({ selectedFile, setSelectedFile }) {

    const onDrop = (acceptedFiles) => {

        if (acceptedFiles.length > 0) {
            setSelectedFile(acceptedFiles[0]);
        }

    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({

        onDrop,

        multiple: false,

        accept: {

            "application/pdf": [".pdf"],

            "application/msword": [".doc"],

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]

        }

    });

    return (

        <div
            {...getRootProps()}
            className={`upload-box ${isDragActive ? "drag-active" : ""}`}
        >

            <input {...getInputProps()} />

            <h2>📄 Upload Resume</h2>

            <p>

                Drag & Drop your Resume here

            </p>

            <p>

                or Click to Browse

            </p>

            <small>

                PDF • DOC • DOCX

            </small>

        </div>

    );

}