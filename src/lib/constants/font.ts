import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

const ArianAMU = localFont({ src: '../../../public/font/arnamu.ttf' });
const Vrdznagir = localFont({ src: '../../../public/font/Vrdznagir.otf' });

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export {
    ArianAMU,
    inter,
    Vrdznagir
};
