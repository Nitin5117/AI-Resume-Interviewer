import api from "./api";

export const createInterview = async (resumeId) => {
  const response = await api.post(`/interview/create/${resumeId}`);
  return response.data;
};

export const getInterview = async (interviewId) => {
  const response = await api.get(`/interview/${interviewId}`);
  return response.data;
};

export const submitAnswer = async (interviewId, questionIndex, answer) => {
  const response = await api.post(`/interview/${interviewId}/answer`, {
    questionIndex,
    answer,
  });

  return response.data;
};
export const evaluateInterview = async (interviewId) => {
  const response = await api.post(`/interview/evaluate/${interviewId}`);

  return response.data;
};
export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");

  return response.data;
};
