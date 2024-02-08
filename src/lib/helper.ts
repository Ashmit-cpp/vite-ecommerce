export const getURL = () => {
  let url = import.meta.env.PUBLIC_VERCEL_URL ?? "http://localhost:3000"; // Default URL for development.

  // // Make sure to include `https://` when not localhost.
  // url = url.includes("http") ? url : `https://${url}`;
  // // Make sure to include trailing `/`.
  // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};
