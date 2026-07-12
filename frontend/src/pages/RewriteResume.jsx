import { useState } from "react";
import { toast } from "react-hot-toast";

import useCareer from "../hooks/useCareer";
import { rewriteResume } from "../api/resumeApi";

import "./Rewrite.css";

export default function RewriteResume() {

    const {

        filename,

        role

    } = useCareer();
    console.log("Rewrite filename:", filename);

    const [loading, setLoading] = useState(false);

    const [rewrittenResume, setRewrittenResume] = useState("");

    async function handleRewrite() {

        if (!filename) {

            toast.error("Please upload a resume first.");

            return;

        }

        try {

            setLoading(true);

            const response = await rewriteResume(

                filename,

                role

            );

            setRewrittenResume(

                response.data.resume

            );

            toast.success("Resume rewritten successfully.");

        }

        catch (err) {

            console.error(err);

            toast.error("Failed to rewrite resume.");

        }

        finally {

            setLoading(false);

        }

    }

    function copyResume() {

        navigator.clipboard.writeText(

            rewrittenResume

        );

        toast.success("Copied to clipboard.");

    }

    function downloadResume() {

        const blob = new Blob(

            [rewrittenResume],

            {

                type: "text/plain"

            }

        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "Improved_Resume.txt";

        link.click();

        URL.revokeObjectURL(url);

    }

    return (

        <div className="rewrite-page">

            <h1>AI Resume Rewrite</h1>

            <p>

                Improve your resume using CareerForge AI.

            </p>

            <button

                className="rewrite-btn"

                onClick={handleRewrite}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "Rewriting..."

                    :

                    "Rewrite Resume"

                }

            </button>

            {

                rewrittenResume && (

                    <>

                        <textarea

                            className="rewrite-output"

                            value={rewrittenResume}

                            readOnly

                        />

                        <div className="rewrite-actions">

                            <button

                                onClick={copyResume}

                            >

                                📋 Copy

                            </button>

                            <button

                                onClick={downloadResume}

                            >

                                ⬇ Download

                            </button>

                        </div>

                    </>

                )

            }

        </div>

    );

}