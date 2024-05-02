import Image from 'next/image';
import styles from './styles.module.sass';
import { ImagePaths } from '@/lib/constants';
import Container from '@/components/components/container';


const Course = () => {


    return (
        <Container>
            <div>
                <Image
                    src={ImagePaths.DESIGN.staplerURL.default.src}
                    alt='stapler'
                    className={styles.image}
                    width={500}
                    height={500}
                    priority
                />


                <figure>
                    <div className={styles.imagesContainer}>
                        <img src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' alt='' />
                        <img className={styles.fadeInClass} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCnA1MYjSBxufD61LcybWKZEPI15L_e4Tei5v23rPQcPNMHyiF88he6zha1yeNYpzISpQ&usqp=CAU' alt='' />
                    </div>
                </figure>
            </div>
        </Container>
    )
}

export default Course;