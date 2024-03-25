export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // fetch from our local backend if browsing locally, or fetch from hosted service if not
    if (window.location.host.includes("localhost")) {
      return "http://localhost:3000";
    }
    return `https://${process.env.VERCEL_URL}`;
  }
};
