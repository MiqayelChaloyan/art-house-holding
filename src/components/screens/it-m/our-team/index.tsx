'use client'

import Container from '@/components/components/container';
import Card from './Card';

import styles from './styles.module.sass';


interface Props {
    data: OUR_TEAM_QUERYResult;
};

const OurTeam = ({ data }: Readonly<Props>) => {
    return (
        <section id='our-team' className={styles.section}>
            <Container className='container'>
                <div className={styles.workers}>
                {data.our_team?.map((worker =>
                    <Card key={worker._key} worker={worker} />
                ))}
                </div>
            </Container>
        </section>
    )
}

export default OurTeam;