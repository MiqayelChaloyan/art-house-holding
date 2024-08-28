'use client'

import styles from './styles.module.sass';

import { ImagePaths } from "@/constants";
import Image from "next/image";

import Container from "@/components/components/container";
import cn from 'classnames';
import { MMArmenU } from "@/constants/font";
import { FaCheck } from "react-icons/fa";

const OurAdvantages = () => {
    return (
        <section id='advantages' className={cn(styles.container, MMArmenU.className)}>
            <Container className="container">
                <div className={styles.box}>
                    <div>
                        <h2 className={styles.title}>
                            Մեր առավելությունները
                        </h2>
                        <div className={styles.feature}>
                            <FaCheck size={20} color='#B2D01B' />
                            <p>
                                Առաջատար մասնագետներ
                            </p>
                        </div>
                        <div className={styles.button}>
                            <button className={styles['sign-up-btn']}>
                            Գրանցվիր հիմա
                            </button>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={ImagePaths.ITM.advantagesURL}
                            alt='advantages'
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

export default OurAdvantages;