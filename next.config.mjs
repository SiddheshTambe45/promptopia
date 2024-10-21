// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config;
    }
  }
  
  export default nextConfig;
  

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//       remotePatterns: [
//           {
//               protocol: 'https',
//               hostname: 'lh3.googleusercontent.com',
//               pathname: '/**', // This allows all paths under the domain
//           },
//       ],
//   },
//   webpack(config) {
//       config.experiments = {
//           ...config.experiments,
//           topLevelAwait: true,
//       };
//       return config;
//   },
// };

// export default nextConfig;
