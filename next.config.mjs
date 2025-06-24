/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    MONGODB_URI: "mongodb+srv://Cornelius:Psc1607311@cluster0.urfir1d.mongodb.net/cornelius?retryWrites=true&w=majority&appName=Cluster0",
    CLOUDINARY_CLOUD_NAME: "dngzamcfh",
    CLOUDINARY_API_KEY: "734215543116656",
    CLOUDINARY_API_SECRET: "169er6FomaSvC8sDamCoxHZC0g4"
  },
   experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase to 10MB or whatever size you need
    },
  },
}

export default nextConfig
