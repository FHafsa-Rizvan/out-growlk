/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // builds a plain static site into the "out" folder, ready for Netlify
  images: { unoptimized: true },
};
export default nextConfig;
