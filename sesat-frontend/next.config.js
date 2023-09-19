/** @type {import('next').NextConfig} */
const nextConfig = {
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
