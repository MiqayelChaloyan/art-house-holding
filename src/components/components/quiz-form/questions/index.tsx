"use client"

import { EffectCallback, useEffect, useState } from 'react'
import styles from './styles.module.sass';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'
import { Calibri } from '@/lib/constants/font';

const Questions = ({ onCheked }: any) => {
    const dispatch = useDispatch();
    const questions = useSelector((state: any) => state.questions.quiz[state.questions.trace]);

    useEffect(() => {
        if (!questions) {
            dispatch(Action.updateLoader(true))
            const locale = localStorage.getItem('quiz') || ''
            const data = require(`@/lib/quiz/${locale}`);
            dispatch(Action.startExamAction(data.default));

            dispatch(Action.updateLoader(false))
        }

        // return () => {
        //     dispatch(Action.resetAllAction());
        // };
    }, [questions])

    const onSelect = (index: number) => {
        onCheked(index)
    }


    return (
        <div>
            <div>
                <h2 className={`${styles.question} ${Calibri.className}`}>{questions?.question}</h2>
            </div>
            <ul id={questions?.id} className={styles.quiz}>
                {
                    questions?.options.map((q: any, i: number) => (
                        <li key={i}>
                            <label className={styles.label} >
                                {q}

                                <input
                                    type="radio"
                                    name="options"
                                    id={`q${i}-option`}
                                    onChange={() => onSelect(i)}
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                            <div className={styles.check}></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Questions;