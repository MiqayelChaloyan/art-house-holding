'use client'

import styles from './styles.module.sass';

import { ImagePaths } from "@/constants";
import Image from "next/image";

import Container from "@/components/components/container";
import cn from 'classnames';
import { MMArmenU } from "@/constants/font";

const Learn = () => {
    return (
        <section id='programming' className={cn(styles.container, MMArmenU.className)}>
            <Container className="container">
                <div className={styles.box}>
                    <div className={styles.left}>
                        <Image
                            src={ImagePaths.ITM.learnURL}
                            alt='learn'
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.title}>
                            Ի՞նչ սովորել ITM-ում
                        </h2>
                        <div className={styles.possibilities}>
                            <p className={styles.text}>
                                ITM Training Centre-ը հնարավորություն է ընձեռնում սովորել
                                IT ոլորտում մեծ առաջադիմություն ունեցող մի շարք
                                մասնագիտություններ, ինչպիսիք են՝
                                Web ծրագրավորումը,
                                UX/UI դիզայնը...
                            </p>
                        </div>

                        <div className={styles.button}>
                            <button className={styles['course-btn']}>
                                Դասընթացներ
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default Learn;