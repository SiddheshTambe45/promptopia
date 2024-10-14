// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['lh3.googleusercontent.com'],
//     },
//     webpack(config) {
//       config.experiments = {
//         ...config.experiments,
//         topLevelAwait: true,
//       }
//       return config;
//     }
//   }
  
//   export default nextConfig;
  

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true, // Enable if using App Router
        serverComponentsExternalPackages: ['axios'], // Include axios for server-side components
      },
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              pathname: '/**', // This allows all paths under the domain
          },
      ],
  },
  webpack(config) {
      config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
      };
      return config;
  },
};

export default nextConfig;
