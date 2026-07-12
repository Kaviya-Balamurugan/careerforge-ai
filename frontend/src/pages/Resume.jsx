import { useState } from "react";
import { toast } from "react-hot-toast";

import UploadBox from "../components/resume/UploadBox";
import FileCard from "../components/resume/FileCard";
import ResumeActions from "../components/resume/ResumeActions";

import "../components/resume/Resume.css";

import { uploadResume } from "../api/resumeApi";
import useCareer from "../hooks/useCareer";

export default function Resume() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const {

    setFilename

} = useCareer();

    async function handleUpload() {

        if (!selectedFile) {

            toast.error("Please select a resume.");

            return;

        }

        try {

            setUploading(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            const response = await uploadResume(formData);

            toast.success(response.data.message);

const storedFile = response.data.stored_as;

setFilename(storedFile);

localStorage.setItem(
    "resumeFilename",
    storedFile
);

toast.success("Resume uploaded and analyzed successfully!");

await loadDashboard(
    response.data.stored_as,
    role
);

console.log("Stored filename:", response.data.stored_as);
console.log("Context filename:", response.data.stored_as);

        }

        catch (err) {

            console.error(err);

            toast.error("Upload failed.");

        }

        finally {

            setUploading(false);

        }

    }

    return (

        <div className="resume-page">

            <UploadBox

                selectedFile={selectedFile}

                setSelectedFile={setSelectedFile}

            />

            <FileCard

                file={selectedFile}

            />

            <ResumeActions

                uploading={uploading}

                onUpload={handleUpload}

            />

        </div>

    );

}