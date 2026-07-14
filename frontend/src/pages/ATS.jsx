import { useEffect, useState } from "react";

import {

    atsFeedback as getAtsFeedback

} from "../api/careerApi";

import useCareer from "../hooks/useCareer";

import "./ATS.css";

export default function ATS() {

    const {

        filename,

        role,

        atsScore,

        atsFeedback,

        setAtsFeedback

    } = useCareer();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadATS() {

            if (!filename) return;

            try {

                setLoading(true);

                const response = await getAtsFeedback(

                    filename,

                    role

                );

                setAtsFeedback(

                    response.data.feedback

                );

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadATS();

    }, [filename, role]);

    if (loading) {

        return <h2>Generating ATS Report...</h2>;

    }

    return (

        <div className="ats-page">

            <h1>📄 ATS Report</h1>

            <div className="ats-card">

                <h2>Overall ATS Score</h2>

                <div className="ats-score">

                    {atsScore?.ats_score ?? "--"}%

                </div>

            </div>

            <div className="ats-section">

                <h2>🤖 AI ATS Analysis</h2>

                <div className="ats-feedback">

                    {

                        atsFeedback

                        ?

                        atsFeedback
                            .split("\n")
                            .map((line, index) => (

                                <p key={index}>

                                    {line}

                                </p>

                            ))

                        :

                        <p>

                            Upload a resume to generate ATS feedback.

                        </p>

                    }

                </div>

            </div>

        </div>

    );

}