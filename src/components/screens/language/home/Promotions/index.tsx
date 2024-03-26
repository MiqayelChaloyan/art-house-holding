"use client"

import Container from "@/components/components/container";


import styles from './styles.module.sass'
import { Vrdznagir } from "@/lib/constants/font";
// import useWindowSize from "@/hooks/useWindowSize";


const data = [1, 2, 3, 4]

const Promotions = () => {
    // const windowSize = useWindowSize();


    return (
        <section className={styles.section}>
            <Container>
                <h2 className={`${styles.title} ${Vrdznagir.className}`}>Ակցիաներ</h2>
                <div className={styles.promotions}>
                    {
                        data?.map((item: any, index: number) =>
                            <div key={index} className={styles.promotion}></div>
                        )
                    }
                </div>
            </Container>
        </section>
    )
}

export default Promotions;