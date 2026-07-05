import api from "./api";

export const createInterview = async (token) => {
  const response = await api.post(
    "/interview/create",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
