/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config) => { 
      config.externals.push({ 
          sharp: 'commonjs sharp', 
          canvas: 'commonjs canvas' 
      });
      config.module.rules.push({
             test: /\.node/,
             use: 'raw-loader',
      });
      return config 
  },
  
}

module.exports = nextConfig
