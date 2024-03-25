export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // Client-side code
    return ""; // or return any default client URL
  } else if (process.env.VERCEL_URL) {
    // Running in a Vercel environment
    return `https://${process.env.VERCEL_URL}`;
  } else {
    // Running locally or in an environment where VERCEL_URL is not set
    return `http://localhost:3000`;
  }
};
