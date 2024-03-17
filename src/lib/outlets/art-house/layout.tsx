"use client"

import Header from '@/lib/outlets/art-house/Header';
import Footer from '@/lib/outlets/art-house/Footer';

interface Props {
    children: React.ReactNode
    headerPosition?: 'fixed' | 'sticky'
};

const Layout: React.FC<Props> = ({ children, headerPosition }) => (
    <div>
        <Header typePosition={`${headerPosition === 'fixed' ? 'fixed' : 'sticky'}`} />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;
