"use client"

import { FacebookProvider, CustomChat } from 'react-facebook';

const FBMessenger = () => {
    return (
        <FacebookProvider appId="766900155396947" chatSupport>
            <CustomChat pageId="108431271487600" minimized={true} />
        </FacebookProvider>
    );
}

export default FBMessenger;