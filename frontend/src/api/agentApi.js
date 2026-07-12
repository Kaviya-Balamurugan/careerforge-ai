import api from "./axios";

export const skillGap=(filename,role)=>

    api.get(

        `/skill-gap?filename=${filename}&role=${role}`

    );

export const roadmap=(filename,role)=>

    api.get(

        `/roadmap?filename=${filename}&role=${role}`

    );

export const learningPlan=(filename,role)=>

    api.get(

        `/learning-plan?filename=${filename}&role=${role}`

    );

export const careerSummary=(filename,role)=>

    api.get(

        `/career-summary?filename=${filename}&role=${role}`

    );