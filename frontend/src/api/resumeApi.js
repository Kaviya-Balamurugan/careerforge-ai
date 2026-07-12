import api from "./axios";

/* ---------------- Resume Upload ---------------- */

export const uploadResume = (formData) =>
    api.post(
        "/upload-resume",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

/* ---------------- Resume ---------------- */

export const extractSkills = (filename) =>
    api.get(`/extract-skills?filename=${filename}`);

export const resumeScore = (filename, role) =>
    api.get(`/resume-score?filename=${filename}&role=${role}`);

export const rewriteResume = (filename, role) =>
    api.post(`/rewrite-resume?filename=${filename}&role=${role}`);

export const resumeChat = (filename, role, question) =>
    api.post(
        `/resume-chat?filename=${filename}&role=${role}&question=${encodeURIComponent(question)}`
    );

export const extractText = (filename) =>
    api.get(`/extract-text?filename=${filename}`);