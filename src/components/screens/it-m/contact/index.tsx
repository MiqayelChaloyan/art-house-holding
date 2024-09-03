'use client'

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import Form from './Form';

import useWindowSize from '@/hooks/useWindowSize';

import { FaFacebookF, FaTwitter, FaPinterestP, FaTiktok } from 'react-icons/fa';
import { FaInstagram, FaViber } from 'react-icons/fa6';
import { IoMailSharp } from 'react-icons/io5';
import { GrLinkedinOption } from 'react-icons/gr';
import { PiTelegramLogoLight, PiWhatsappLogo } from 'react-icons/pi';
import { AiOutlineYoutube } from 'react-icons/ai';

import { Calibri, MMArmenU } from '@/constants/font';

import { socialNetwork } from '@/types/it-m';

import cn from 'classnames';

import styles from './styles.module.sass';


const socialNetworkComponents: socialNetwork = {
    facebook: FaFacebookF,
    x: FaTwitter,
    instagram: FaInstagram,
    gmail: IoMailSharp,
    linkedin: GrLinkedinOption,
    pinterest: FaPinterestP,
    telegram: PiTelegramLogoLight,
    tiktok: FaTiktok,
    viber: FaViber,
    whatsapp: PiWhatsappLogo,
    youtube: AiOutlineYoutube,
};

interface Props {
    lessons: LESSON[];
    lessonsArmenianKeyword: LESSON[];
    contacts: CONTACT_US_QUERYResult;
};

const Contacts = ({
    lessons,
    lessonsArmenianKeyword,
    contacts
}: Readonly<Props>) => {
    const t = useTranslations();
    const windowSize = useWindowSize();


    const phoneNumbers = contacts.phone_numbers?.map((number, index) => (
        <div key={index} className={styles.social}>
            <span className={styles.contactName}>
                {t('contact-us-form.phone-number')} {index + 1}:
            </span>
            <Link
                href={`tel:${number}`}
                aria-label={number}
                className={cn(styles.contact, Calibri.className)}
                prefetch={true}
                passHref
            >
                <span className={styles.number}>{number}</span>
            </Link>
        </div>
    ));

    const hosts = contacts.social_links?.map((host: SOCIAL) => {
        const socialName = host?.social_name.toLowerCase();
        const link = socialName === 'gmail' ? `mailto:${host?.social_link}` : host?.social_link;
        const SocialIcon = (socialNetworkComponents as any)[socialName];
        if (!SocialIcon) return null;

        return (
            <Link
                key={host._key}
                href={link}
                aria-label={host?.social_name}
                className={styles.social_network}
                target='_blank'
            >
                <SocialIcon
                    size={windowSize.width <= 1024 ? 15 : 30}
                    fill='#F9CC48'
                />
            </Link>
        )
    });

    const messengers = contacts.messengers?.map(messenger => (
        <div key={messenger._key} className={styles.social}>
            <span className={styles.contactName}>
                {messenger?.messenger_name}:
            </span>
            <Link
                href={`tel:${messenger?.messenger}`}
                aria-label={messenger?.messenger}
                className={cn(styles.contact, Calibri.className)}
                prefetch={true}
                passHref
            >
                <span className={styles.number}>{messenger?.messenger}</span>
            </Link>
        </div>
    ));


    return (
        <section id='contacts' className={MMArmenU.className}>
            <Container className='container'>
                <div className={styles.block}>
                    <div className={styles.left}>
                        <h2 className={styles.title}>
                            {t('texts.contact-us')}
                        </h2>
                        <div className={styles.contacts}>
                            <div className={styles.box}>
                                {messengers}
                                <div className={styles.social}>
                                    <span className={styles.contactName}>
                                        {t('texts.address')}:
                                    </span>
                                    <p className={styles.address}>
                                        {contacts?.address}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.box}>
                                {phoneNumbers}
                                <div className={styles.social}>
                                    <span className={styles.contactName}>
                                        {t('texts.other-platforms')}
                                    </span>
                                    <div className={styles.hosts}>
                                        {hosts}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.title}>
                            {t('texts.send-request')}
                        </h2>
                        <Form
                            lessons={lessons}
                            lessonsArmenianKeyword={lessonsArmenianKeyword}
                            classNameProperty='small'
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default Contacts;