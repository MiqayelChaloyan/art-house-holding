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
            href = `viber://chat?number=${messenger?.messenger}`;
            break;
        case 'skype':
            href = `skype:${messenger?.messenger}?call`;
            break;
        default:
            href = `tel:${messenger?.messenger.replace(/\D/g, '')}`;
            break;
    }

    return href;
};
