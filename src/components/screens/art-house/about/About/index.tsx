'use client'

import styles from './styles.module.sass'

import cn from 'classnames';
import { ArianAMU } from "@/lib/constants/font";
import { useTranslations } from "next-intl";




const templateTXT = `
Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex ullam saepe, totam dicta fuga provident. Fuga, labore porro? Dolorem unde, explicabo atque voluptatum laborum harum, quas velit voluptates sit rerum non ullam laboriosam iusto ad sequi hic soluta consequatur quaerat! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`

const About = () => {
    const t = useTranslations('');

    return (
            <section className={styles.section} id='about'>
                <div className={styles.box}>
                    <div className={styles.contentLeft}>
                        <div className={styles.row}>
                            {/* <div className={styles.imgWrapper}>
                                <img src="https://images.unsplash.com/photo-1687579521048-217e24217d53?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcxNzl8&ixlib=rb-4.0.3&q=85" alt="" />
                            </div>
                            <div className={styles.imgWrapper}>
                                <img src="https://images.unsplash.com/photo-1688133338995-a394ce7314e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcyMDN8&ixlib=rb-4.0.3&q=85" alt="" />
                            </div>
                            <div className={styles.imgWrapper}>
                                <img src="https://images.unsplash.com/photo-1686354715732-7e4685269a25?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODg5ODcyNzN8&ixlib=rb-4.0.3&q=85" alt="" />
                            </div> */}
                                <img className={styles.imgA} src='https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?cs=srgb&dl=pexels-thgusstavo-2102587.jpg&fm=jpg' alt=''/>
                        </div>
                    </div>
                    <div className={styles.contentRight}>
                        <div className={styles.content}>
                            {/* <h4 className={ArianAMU.className}>
                                {t('texts.welcome')}
                            </h4> */}
                            <h2 className={ArianAMU.className}>
                                {t('navigation.about')}
                            </h2>
                            <p className={ArianAMU.className}>
                                {templateTXT}
                            </p>
                            <a className={ArianAMU.className} href="#">
                                {t('buttons.read-more')}...
                            </a>
                        </div>
                    </div>
                </div>
            </section>
    )
};

export default About;