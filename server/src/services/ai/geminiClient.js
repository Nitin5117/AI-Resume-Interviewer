const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const AppError = require("../../errors/AppError");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const cleanGeminiResponse = (response) => {
  return response
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

const getErrorStatus = (error) => {
  return (
    error?.status ||
    error?.response?.status ||
    error?.cause?.status
  );
};

const handleGeminiError = (error) => {
  if (error instanceof AppError) {
    throw error;
  }

  const status = getErrorStatus(error);

  if (status === 429) {
    throw new AppError(
      "AI service quota exceeded. Please try again later.",
      429,
    );
  }

  if (status === 503) {
    throw new AppError(
      "AI service is temporarily unavailable. Please try again later.",
      503,
    );
  }

  if (
    error?.name === "AbortError" ||
    error?.code === "ETIMEDOUT"
  ) {
    throw new AppError(
      "AI service request timed out. Please try again.",
      504,
    );
  }

  throw new AppError(
    "AI service failed. Please try again later.",
    500,
  );
};

const generateJSON = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);

    const responseText =
      result?.response?.text?.();

    if (
      !responseText ||
      !responseText.trim()
    ) {
      throw new AppError(
        "AI service returned an empty response.",
        502,
      );
    }

    const cleanedResponse =
      cleanGeminiResponse(responseText);

    try {
      return JSON.parse(cleanedResponse);
    } catch (error) {
      throw new AppError(
        "AI service returned an invalid response.",
        502,
      );
    }
  } catch (error) {
    handleGeminiError(error);
  }
};

module.exports = {
  generateJSON,
};