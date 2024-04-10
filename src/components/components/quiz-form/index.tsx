'use client'

import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.sass';

import Questions from './questions';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'
import { FaArrowRight } from "react-icons/fa";
import Stepper from './stepper';

const QuizForm = () => {
  const questions = useSelector((state: any) => state.questions.quiz);
  const trace = useSelector((state: any) => state.questions.trace);
  // const loading = useSelector((state: any) => state.questions.isLoading);
  // const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();
  // dispatch(Action.updateLoader())



  const question = useSelector((state: any) => state.questions.quiz[state.questions.trace]);
  const result = useSelector((state: any) => state.questions.result);

  const handleNext = () => {
    if (trace < questions.length - 1) {
      dispatch(Action.moveNextAction())
      // setCurrent(Math.min(current + 1, questions.length + 1));
    } else {
      console.log(result)
    }
  }

  const handleCheked = (check: any) => {
    if (question.answer === question.options[check]) {
      dispatch(Action.addResult())
    }
  }

  // const handlePrevious = () => {
  //   setCurrent(Math.max(current - 1, 0));
  // }

  const steps = Array.from({ length: questions.length }, (_, i) => i);


  return (
    <div className={styles.form}>
      <div className={styles.header}>
        <Stepper steps={steps} />
      </div>
      <Questions onCheked={handleCheked} />
      <div className={styles.next_button}>
        <button className={`${styles.btn} ${styles.next}`} onClick={handleNext}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  )
}

export default QuizForm
