"use client"

import { FacebookProvider, CustomChat } from 'react-facebook';
import { LiveChatLoaderProvider } from 'react-live-chat-loader'

const FBMessenger = () => {
    return (
        <LiveChatLoaderProvider providerKey="766900155396947" provider="helpScout">
            <FacebookProvider appId="766900155396947" chatSupport>
                <CustomChat pageId="108431271487600" />
            </FacebookProvider>
        </LiveChatLoaderProvider>
    );
}

export default FBMessenger;