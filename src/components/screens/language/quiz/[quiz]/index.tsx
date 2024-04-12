'use client'

import { useEffect } from 'react';

import QuizForm from '@/components/components/quiz-form';

import { useDispatch, useSelector } from "react-redux";
import * as Action from '@/store/question_reducer'

import { QUIZ } from '../../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';
import QuestionsViewer from '@/components/components/quiz-form/viewer';


interface Props {
    data: QUIZ
}


const QuizPage = ({ data }: Props) => {
    const isViewAnswer = useSelector((state: any) => state.questions.isViewAnswer);
    const answer = useSelector((state: any) => state.questions.answer);

    const dispatch = useDispatch();

    const startExam = () => {
        dispatch(Action.startExamAction(data.questions))
    };

    useEffect(() => startExam(), []);


    return (
        <section id='quiz'>
            {
                isViewAnswer ?
                    <QuestionsViewer />
                    :
                    <div className={styles.row}>
                        <div className={styles.man} />
                        <QuizForm />
                        <div className={styles.woman} />
                    </div>
            }
        </section>
    );
}

export default QuizPage;