import useCareer from "../hooks/useCareer";

import "./Skills.css";

export default function Skills() {

    const {

        skillGap,

        loading

    } = useCareer();

    if (loading) {

        return <h2>Loading Skill Gap...</h2>;

    }

    return (

        <div className="skills-page">

            <h1>🧠 Skill Gap Analysis</h1>

            <div className="readiness-card">

                <h2>Readiness Score</h2>

                <h1>

                    {skillGap?.readiness_score ?? "--"}%

                </h1>

                <div className="progress-bar">

                    <div

                        className="progress-fill"

                        style={{

                            width: `${skillGap?.readiness_score ?? 0}%`

                        }}

                    />

                </div>

            </div>

            <div className="skill-grid">

                <div className="skill-box">

                    <h2>✅ Matched Skills</h2>

                    {

                        skillGap?.matched_skills?.length ?

                        skillGap.matched_skills.map((skill) => (

                            <span

                                key={skill}

                                className="skill-chip matched"

                            >

                                {skill}

                            </span>

                        ))

                        :

                        <p>No matched skills found.</p>

                    }

                </div>

                <div className="skill-box">

                    <h2>❌ Missing Skills</h2>

                    {

                        skillGap?.missing_skills?.length ?

                        skillGap.missing_skills.map((skill) => (

                            <span

                                key={skill}

                                className="skill-chip missing"

                            >

                                {skill}

                            </span>

                        ))

                        :

                        <p>No missing skills 🎉</p>

                    }

                </div>

            </div>

            <div className="recommendation-box">

                <h2>💡 AI Recommendation</h2>

                <p>

                    {skillGap?.recommendation ??

                    "Upload a resume to receive personalized recommendations."}

                </p>

            </div>

        </div>

    );

}