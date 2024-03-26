import Container from "@/components/components/container"

import styles from './styles.module.sass';
import { Vrdznagir } from "@/lib/constants/font";


const OurDailyLife = () => {


    return (
        <section className={styles.section}>
            <Container>
                <div className={styles.ourDaily}>
                    <h2 className={`${styles.title} ${Vrdznagir.className}`}>Մեր առօրյան</h2>

                </div>
            </Container>
        </section>
    )
}

export default OurDailyLife;