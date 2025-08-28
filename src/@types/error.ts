export interface ApiError {
  status?: number | string;
  data?: {
    message?: string;
    error?: string;
  };
  message?: string;
}

export interface CustomError extends Error {
  status?: number | string;
  data?: {
    message?: string;
    error?: string;
  };
}