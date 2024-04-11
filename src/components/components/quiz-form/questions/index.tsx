"use client"

import { EffectCallback, useEffect, useState } from 'react'
import styles from './styles.module.sass';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'
import { Calibri } from '@/lib/constants/font';

import cn from 'classnames'


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
        <div className={styles.field}>
            <h2 className={`${styles.question} ${Calibri.className}`}>{questions?.question}</h2>
            <ul id={questions?.id} className={styles.quiz}>
                {
                    questions?.options.map((q: any, i: number) => (
                        <li className={styles.container} key={i}>
                            <input type="radio" name="options" id={`q${i}-option`} onChange={() => onSelect(i)} className={styles.radio} />
                            <span className={styles.checkmark}></span>
                            <label htmlFor={`q${i}-option`} className={cn(styles.label, Calibri.className)}>{q}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Questions;