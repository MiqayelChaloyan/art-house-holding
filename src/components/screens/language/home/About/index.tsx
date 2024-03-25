
import Container from '@/components/components/container';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass'


const About = () => {

    return (
        <div className={styles.container}>
            <Container>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={`${styles.title} ${Arial.className} ${Arial.className}`}>Մեր մասին</h1>
                        <p className={styles.text}>
                            Արտ Հաուս լեզվի կենտրոնը հիմնադրվել է 2009 թ-ին՝ հետևելով մեկ գերնպատակի. տալ լիարժեք մասնագիտական կրթություն, անսահման գիտելիք և հմտություն, որի շնորհիվ ուսանողներից յուրաքանչյուրը մրցունակ կլինի աշխատաշուկայում  թե՛ Հայաստանում, թե՛ արտերկրում:
                            Ուսուցումն իրականացնում են բարձրակարգ մասնագետ – դասավանդողներ, որոնք իրենց տարիների աշխատանքային փորձով, գիտելիքներով և հմտությամբ առաջատարն են Հայաստանում և նվիրյալը իրենց գործի:
                            Ուսանողները ձեռք են բերում ժամանակի մեծ պահանջարկ վայելող մասնագիտություններ՝ տեսական խորը գիտելիքներով և գործնականում կիրառվող կատարողական բարձր արվեստով և հմտությամբ:
                            Ուսուցումն առավել արդյունավետ է դառնում, երբ բարձր որակն ու ճկուն գնային համակարգը համադրվում են, երբ ուսանողներին տրամադրվում են ուսմանն անհրաժեշտ բոլոր գործիքներն ու նյութերը՝ զերծ պահելով նրանց հավելյալ ծախսերից, էլ ավելի մատչելի դարձնելով մասնագիտության յուրացումը:
                            Մեր որակի երաշխիքն են հազարավոր ուսանողներ, որոնք կերտել են իրենց ապագան, դարձել հայտնի իրենց ոլորտում և, ինչու չէ,  հիմնել իրենց սեփական բիզնեսը:
                        </p>

                        <div className={styles.buttons}>
                            <button className={cn(
                                styles.button,
                                Arial.className,
                                styles.separate_1
                            )}>
                                Ուղարկել հայտ
                            </button>
                            <button className={cn(
                                styles.button,
                                Arial.className,
                                styles.separate_2
                            )}>
                                Ավելին
                            </button>
                        </div>
                    </div>
                    <div className={styles.gallery}>
                        <div className={styles.gallery_one}></div>
                        <div className={styles.gallery_two}></div>
                        <div className={styles.gallery_three}></div>

                    </div>
                </div>
            </Container>
        </div>
    )
}

export default About;