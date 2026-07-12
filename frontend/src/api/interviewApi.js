import api from "./axios";

export const interviewQuestions=(

    filename,

    role

)=>

    api.get(

        `/interview-questions?filename=${filename}&role=${role}`

    );

export const evaluateAnswer=(

    question,

    answer

)=>

    api.post(

        `/evaluate-answer?question=${question}&answer=${answer}`

    );