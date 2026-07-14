import useCareer from "../hooks/useCareer";

import "./Analytics.css";

export default function Analytics() {

    const {

        resumeScore,

        atsScore,

        skillGap

    } = useCareer();

    return (

        <div className="analytics-page">

            <h1>📊 Resume Analytics</h1>

            <div className="analytics-grid">

                <div className="analytics-card">

                    <h3>Resume Score</h3>

                    <h1>

                        {resumeScore?.resume_score ?? "--"}%

                    </h1>

                </div>

                <div className="analytics-card">

                    <h3>ATS Score</h3>

                    <h1>

                        {atsScore?.ats_score ?? "--"}%

                    </h1>

                </div>

                <div className="analytics-card">

                    <h3>Readiness</h3>

                    <h1>

                        {skillGap?.readiness_score ?? "--"}%

                    </h1>

                </div>

                <div className="analytics-card">

                    <h3>Matched Skills</h3>

                    <h1>

                        {skillGap?.matched_skills?.length ?? 0}

                    </h1>

                </div>

            </div>

            <div className="skills-section">

                <div className="skills-box">

                    <h2>✅ Matched Skills</h2>

                    {

                        skillGap?.matched_skills?.length ? (

                            skillGap.matched_skills.map((skill) => (

                                <span

                                    key={skill}

                                    className="skill-chip matched"

                                >

                                    {skill}

                                </span>

                            ))

                        ) : (

                            <p>No data available.</p>

                        )

                    }

                </div>

                <div className="skills-box">

                    <h2>❌ Missing Skills</h2>

                    {

                        skillGap?.missing_skills?.length ? (

                            skillGap.missing_skills.map((skill) => (

                                <span

                                    key={skill}

                                    className="skill-chip missing"

                                >

                                    {skill}

                                </span>

                            ))

                        ) : (

                            <p>No missing skills.</p>

                        )

                    }

                </div>

            </div>

        </div>

    );

}