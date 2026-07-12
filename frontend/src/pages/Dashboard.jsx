import WelcomeCard from "../components/dashboard/WelcomeCard";
import SectionTitle from "../components/dashboard/SectionTitle";
import StatCard from "../components/dashboard/StatCard";
import SkillChart from "../components/dashboard/SkillChart";
import SkillChip from "../components/dashboard/SkillChip";
import RoadmapCard from "../components/dashboard/RoadmapCard";
import ProjectCard from "../components/dashboard/ProjectCard";

import useCareer from "../hooks/useCareer";

import "./Dashboard.css";

export default function Dashboard() {

    const {

        role,

        resumeScore,

        atsScore,

        skillGap,

        roadmap,

        loading

    } = useCareer();

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <>

            <WelcomeCard />

            <h3 className="target-role">

                🎯 Target Role : {role}

            </h3>

            <SectionTitle title="Overview" />

            <div className="stats-grid">

                <StatCard
                    title="Resume Score"
                    value={resumeScore?.resume_score ?? "--"}
                    color="#3B82F6"
                />

                <StatCard
                    title="ATS Score"
                    value={atsScore?.ats_score ?? "--"}
                    color="#22C55E"
                />

                <StatCard
                    title="Readiness"
                    value={
                        skillGap
                            ? `${skillGap.readiness_score}%`
                            : "--"
                    }
                    color="#F59E0B"
                />

                <StatCard
                    title="Matched Skills"
                    value={
                        skillGap
                            ? skillGap.matched_skills.length
                            : "--"
                    }
                    color="#EC4899"
                />

            </div>

            <SectionTitle title="Skill Progress" />

            <SkillChart />

            <SectionTitle title="Skills" />

            <div className="skill-container">

                {
                    skillGap?.matched_skills?.map((skill) => (

                        <SkillChip
                            key={skill}
                            skill={skill}
                            matched={true}
                        />

                    ))
                }

                {
                    skillGap?.missing_skills?.map((skill) => (

                        <SkillChip
                            key={skill}
                            skill={skill}
                            matched={false}
                        />

                    ))
                }

            </div>

            <SectionTitle title="Learning Roadmap" />

            <RoadmapCard roadmap={roadmap} />

            <SectionTitle title="Recommended Projects" />

            <ProjectCard />

        </>

    );

}