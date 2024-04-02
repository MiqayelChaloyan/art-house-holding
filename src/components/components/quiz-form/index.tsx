'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.sass';

import Questions from './questions';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'

const QuizForm = () => {
  const questions = useSelector((state: any) => state.questions.quiz);
  const trace = useSelector((state: any) => state.questions.trace);
  const loading = useSelector((state: any) => state.questions.isLoading);

  const dispatch = useDispatch();
  // dispatch(Action.updateLoader())


  const question = useSelector((state: any) => state.questions.quiz[state.questions.trace]);
  const result = useSelector((state: any) => state.questions.result);

  const handleNext = () => {
    if (trace < questions.length - 1) {
      dispatch(Action.moveNextAction())
    } else {
      console.log(result)
    }
  }

  const handleCheked = (check: any) => {
    if (question.answer === question.options[check]) {
      dispatch(Action.addResult())
    }
  }

  // useEffect(() => {
  //   dispatch(Action.updateLoader(false))
  // }, [questions])

  // console.log(questions.length)

  return (
    <div className={styles.form}>
      <h2>{trace}/{questions.length}</h2>
     {!loading ? <Questions onCheked={handleCheked} /> : <p>...loading</p>}
      <div className={styles.next_button}>
        <button className={`${styles.btn} ${styles.next}`} onClick={handleNext}>
          next
        </button>
      </div>
    </div>
  )
}

export default QuizForm
