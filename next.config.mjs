import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,

    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  
    images: {
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
        },
      ],
    },

    compiler: {
      relay: {
        src: './',
        artifactDirectory: './__generated__',
        language: 'typescript',
        eagerEsModules: false,
        styledComponents: true,
      },
    },

};

export default withNextIntl(nextConfig);