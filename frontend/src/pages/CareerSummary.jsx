import useCareer from "../hooks/useCareer";
import "../components/summary/Summary.css";

export default function CareerSummary() {

    const {

        careerSummary,

        loading

    } = useCareer();

    if (loading) {

        return <h2>Loading...</h2>;

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