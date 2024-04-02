// interface Props {
//     data: any//PRICE_LIST_LANHUAGE[];
// }
// const Home: React.FC<Props> = ({ data }) => {

import QuizForm from '@/components/components/quiz-form';

import styles from './styles.module.sass';

const QuizPage = () => {
    return (
        <section id='test'>
            <div className={styles.row}>
                <div className={styles.man} />
                <QuizForm />
                <div className={styles.woman} />
            </div>
        </section>
    );
}

export default QuizPage;