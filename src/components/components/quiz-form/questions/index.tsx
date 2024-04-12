"use client"

import { EffectCallback, useEffect, useState } from 'react'
import styles from './styles.module.sass';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'
import { Calibri } from '@/lib/constants/font';

import cn from 'classnames'


const Questions = ({ onCheked, isOptions }: any) => {
    // const dispatch = useDispatch();

    const questions = useSelector((state: any) => state.questions.quiz[state.questions.trace]);

    const onSelect = (index: number) => onCheked(index)


    return (
        <div className={styles.field}>
            <h2 className={`${styles.question} ${Calibri.className}`}>{questions?.question}</h2>
            <ul id={questions?.id} className={styles.quiz}>
                {
                    questions?.options.map((q: any, i: number) => (
                        <li className={styles.container} key={i}>
                            <input
                                checked={isOptions?.length ? isOptions[i]?.isChecked : false}
                                type="radio"
                                name="options"
                                id={`q${i}-option`}
                                onChange={() => onSelect(i)}
                                className={styles.radio}
                            />
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