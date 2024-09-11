'use client'

import React, { useEffect } from 'react';

import QuizForm from '@/components/components/quiz-form';
import QuestionsViewer from '@/components/components/quiz-form/viewer';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'

import styles from './styles.module.sass';


interface Props {
    data: QUIZ_QUERYResult;
};

const QuizPage = ({ data }: Readonly<Props>) => {
    const isViewAnswer = useSelector((state: any) => state.questions.isViewAnswer);

    const dispatch = useDispatch();

    const startExam = () => {
        dispatch(Action.startExamAction(data.questions))
        dispatch(Action.updateLoader(false))
    };

    useEffect(() => startExam(), []);


    return (
        <section>
            {isViewAnswer ?
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
};

export default React.memo(QuizPage);