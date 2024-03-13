import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

const ArianAMU = localFont({ src: '../../public/font/arnamu.ttf' });

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export {
    ArianAMU,
    inter
};
