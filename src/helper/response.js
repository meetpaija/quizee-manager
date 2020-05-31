import mongoose from "mongoose";

export const setErrorResponse = (error) => {
  console.error(error.stack || error);

  if (!(error instanceof mongoose.Error)) {
    error = {
      message: "Something went wrong : " + error.message,
    };
  }

  return {
    success: false,
    timestamp: Date.now(),
    error: error,
  };
};

export const setCustomErrorResponse = (message) => {
  return {
    success: false,
    timestamp: Date.now(),
    error: {
      message,
    },
  };
};

export const setSucessResponse = (data) => {
  return {
    success: true,
    timestamp: Date.now(),
    data,
  };
};

export const setAccessTokenResponse = (data, accessToken) => {
  return {
    success: true,
    timestamp: Date.now(),
    data,
    accessToken,
  };
};
