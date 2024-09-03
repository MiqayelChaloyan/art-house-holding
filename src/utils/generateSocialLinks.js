export const generateSocialLinks = (messenger) => {
    if (!messenger || !messenger.messenger_name) {
        return 'Invalid messenger data';
    }

    let href;

    switch (messenger?.messenger_name.toLowerCase()) {
        case 'whatsapp':
            href = `https://api.whatsapp.com/send?phone=${messenger?.messenger.replace(/\D/g, '')}`;
            break;
        case 'viber':
            href = `viber://chat?number=${messenger?.messenger.replace(/\D/g, '')}`;
            break;
        case 'skype':
            href = `skype:${messenger?.messenger}?call`;
            break;
        case 'telegram':
            href = `https://t.me/${messenger?.messenger}`;
            break;
        case 'facebook messenger':
            href = `https://m.me/${messenger?.messenger}`;
            break;
        case 'snapchat':
            href = `https://www.snapchat.com/add/${messenger?.messenger}`;
            break;
        default:
            href = `tel:${messenger?.messenger.replace(/\D/g, '')}`;
            break;
    }

    return href;
};
