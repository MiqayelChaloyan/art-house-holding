'use client'

import { ImagePaths } from "@/constants";
import Image from "next/image";

import styles from './styles.module.sass'
import Container from "@/components/components/container";
import cn from 'classnames';
import { MMArmenU } from "@/constants/font";


const About = () => {
    return (
        <section id='about' className={cn(styles.container, MMArmenU.className)}>
            <Container className="container">
                <div className={styles.box}>
                    <div className={styles.left}>
                       <div className={styles.texts}>
                       <h1 className={styles.title}>
                            ITM Training Centre-ի մասին
                        </h1>
                        <p className={styles.content}>
                            ITM training centre-ի դասընթացներին մասնակցելու արդյունքում
                            Դուք կստանաք որակյալ մասնագիտական կրթություն․․․
                            ITM training centre-ի դասընթացներին մասնակցելու արդյունքում
                            Դուք կստանաք որակյալ մասնագիտական կրթություն․․․
                        </p>
                       </div>
                        <div className={styles.buttons}>
                            <button className={styles['more-btn']}>
                                Ավելին
                            </button>
                            <button className={styles['register-btn']}>
                                Գրանցվել
                            </button>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <Image
                            src={ImagePaths.ITM.illustrationURL}
                            alt='illustration'
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default About;