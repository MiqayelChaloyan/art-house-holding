// export const generateSocialLinks = (messenger) => {
//     if (!messenger || !messenger.messenger_name || !messenger.messenger) {
//         return 'Invalid messenger data';
//     }

//     const formatPhoneNumber = (number) => number.replace(/\D/g, '');

//     let href;

//     switch (messenger.messenger_name.toLowerCase()) {
//         case 'whatsapp':
//             href = `https://api.whatsapp.com/send?phone=${formatPhoneNumber(messenger.messenger)}`;
//             break;
//         case 'viber':
//             href = `viber://pa?chatURI=37496200408`;
//             break;
//         case 'skype':
//             href = `skype:${messenger.messenger}?call`;
//             break;
//         case 'telegram':
//             href = `https://t.me/${messenger.messenger}`;
//             break;
//         case 'facebook messenger':
//             href = `https://m.me/${messenger.messenger}`;
//             break;
//         case 'snapchat':
//             href = `https://www.snapchat.com/add/${messenger.messenger}`;
//             break;
//         default:
//             href = `tel:${formatPhoneNumber(messenger.messenger)}`;
//             break;
//     }

//     return href;
// };
