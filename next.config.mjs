/** @type {import('next').NextConfig} */
const nextConfig = {
    // config domain uploadthing.com
    images: {
        domains: [ 
            'uploadthing.com',
            'utfs.io'
        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
            {
              protocol:'https',
              hostname:'images.domains'
            }
          ],
        
    }
};

export default nextConfig;
