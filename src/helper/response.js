export const setErrorResponse = (error) => {

  return {
    success: false,
    timestamp: Date.now(),
    error,
  };
};

export const setCustomErrorResponse = (message) => {
  return {
    success: false,
    timestamp: Date.now(),
    error : {
      message
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
    accessToken
  };
};