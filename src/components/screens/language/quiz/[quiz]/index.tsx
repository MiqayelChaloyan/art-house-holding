import QuizForm from '@/components/components/quiz-form';

import styles from './styles.module.sass';

const QuizPage = () => {
    return (
        <section id='quiz'>
            <div className={styles.row}>
                <div className={styles.man} />
                <QuizForm />
                <div className={styles.woman} />
            </div>
        </section>
    );
}

export default QuizPage;