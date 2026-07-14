import { useEffect, useState } from "react";

import { careerSummary as getCareerSummary } from "../api/careerApi";

import useCareer from "../hooks/useCareer";

import "../components/summary/Summary.css";

export default function CareerSummary() {

    const {

        filename,

        role,

        careerSummary,

        setCareerSummary

    } = useCareer();

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadSummary() {

            if (!filename) return;

            try {

                setLoading(true);

                const response = await getCareerSummary(

                    filename,

                    role

                );

                setCareerSummary(

                    response.data.summary

                );

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        loadSummary();

    }, [filename, role]);

    if (loading) {

        return <h2>Generating Career Summary...</h2>;

    }

    return (

        <div className="summary-page">

            <h1>🎯 Career Summary</h1>

            <div className="summary-card">

                {

                    careerSummary

                        ?

                        careerSummary

                        :

                        "Upload a resume to generate an AI career summary."

                }

            </div>

        </div>

    );

}