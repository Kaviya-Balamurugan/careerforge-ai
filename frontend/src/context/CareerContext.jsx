import { createContext, useContext, useState, useEffect } from "react";

import { resumeScore } from "../api/resumeApi";

import {
    skillGap,
    roadmap,
    learningPlan,
    careerSummary
} from "../api/careerApi";

const CareerContext = createContext();

export function CareerProvider({ children }) {

    const [filename, setFilename] = useState(

        localStorage.getItem("resumeFilename") || ""

    );

    const [role, setRole] = useState("ML Engineer");

    const [resumeScoreData, setResumeScore] = useState(null);

    const [atsScoreData, setAtsScore] = useState(null);

    const [skillGapData, setSkillGap] = useState(null);

    const [roadmapData, setRoadmap] = useState(null);

    const [learningPlanData, setLearningPlan] = useState(null);

    const [careerSummaryData, setCareerSummary] = useState("");

    const [loading, setLoading] = useState(false);

    async function loadDashboard(file, targetRole) {

        if (!file) return;

        try {

            setLoading(true);

            const [

                resumeRes,

                gapRes,

                roadmapRes,

                learningRes,

                summaryRes

            ] = await Promise.all([

                resumeScore(file, targetRole),

                skillGap(file, targetRole),

                roadmap(file, targetRole),

                learningPlan(file, targetRole),

                careerSummary(file, targetRole)

            ]);

            setResumeScore(resumeRes.data);

            setAtsScore({

                ats_score: resumeRes.data.ats

            });

            setSkillGap(gapRes.data);

            setRoadmap(roadmapRes.data);

            setLearningPlan(learningRes.data);

            setCareerSummary(summaryRes.data.summary);

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }

    // Automatically load dashboard whenever
    // filename or role changes

    useEffect(() => {

        if (filename) {

            loadDashboard(

                filename,

                role

            );

        }

    }, [filename, role]);

    return (

        <CareerContext.Provider

            value={{

                filename,
                setFilename,

                role,
                setRole,

                resumeScore: resumeScoreData,

                atsScore: atsScoreData,

                skillGap: skillGapData,

                roadmap: roadmapData,

                learningPlan: learningPlanData,

                careerSummary: careerSummaryData,

                loading,

                loadDashboard

            }}

        >

            {children}

        </CareerContext.Provider>

    );

}

export function useCareer() {

    return useContext(CareerContext);

}