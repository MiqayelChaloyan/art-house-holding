'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer';

import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import Container from '../../container';
import { ArianAMU } from "@/lib/constants/font";

import cn from 'classnames';

import styles from './styles.module.sass';


const QuestionsViewer = () => {
    const answer = useSelector((state: any) => state.questions.answer);
    const dispatch = useDispatch();
    const t = useTranslations();
    const localActive = useLocale();

    const answers = answer.map((item: any, index: number) => (
        <div key={index} className={styles.answer}>
            <h3 className={cn(styles.question, ArianAMU.className)}>{item.question}</h3>
            {
                item.wrongAnswer &&
                <div className={styles.wrong}>
                    <p className={cn(styles.text, ArianAMU.className)}>{item.wrongAnswer}</p>
                    <IoClose fill='#fff' />
                </div>
            }
            <div className={styles.correct} style={{ backgroundColor: item.wrongAnswer ? '#006ED2' : '#F9CC48' }}>
                <p className={cn(styles.text, ArianAMU.className)}>{item.correctAnswer}</p>
                <FaCheck fill='#fff' />
            </div>

        </div>
    ));


    return (
        <section id='answers'>
            <Container>
                <h1 className={cn(styles.title, ArianAMU.className)}>{t('sections.your-answers')}</h1>
                <div className={styles.container}>
                    {answers}
                </div>
                <Link
                    href={`/${localActive}/language/quiz/`}
                    aria-label={`/${localActive}/language/quiz/`}
                    className={cn(styles.link, ArianAMU.className)}
                    onClick={() =>  dispatch(Action.resetAllAction())}
                >
                    {t('buttons.go-back')}
                </Link>
            </Container>
        </section>
    )
}


export default QuestionsViewer;