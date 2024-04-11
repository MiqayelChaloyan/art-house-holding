'use client'

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'

import { Calibri } from '@/lib/constants/font';

import { FaArrowRight } from 'react-icons/fa';

import Questions from '../../questions';

import cn from 'classnames';

import styles from './styles.module.sass';


const Step = ({ index, trace }: any) => {
    const done = index < trace;
    const activeStep = index === trace;
    const activeClassName = activeStep ? styles.stepper__step__active : '';
    const doneClassName = done ? styles.stepper__step__done : '';

    return <div className={`${styles.stepper__step} ${activeClassName} ${doneClassName}`} />
};

const Stepper = ({ steps }: any) => {
    const trace = useSelector((state: any) => state.questions.trace);
    const questions = useSelector((state: any) => state.questions.quiz);

    return (
        <div className={styles.stepper_contain}>
            <div>
                <h2 className={`${styles.steps} ${Calibri.className}`}>{trace + 1}/{questions.length}</h2>
            </div>
            <div className={styles.stepper}>
                {steps.map((_: any, index: number) =>
                    <Step key={index} trace={trace} index={index} />
                )}
            </div>
        </div>
    )
};


const HorizontalLinearStepper = () => {
    const questions = useSelector((state: any) => state.questions.quiz);
    const trace = useSelector((state: any) => state.questions.trace);
    // const loading = useSelector((state: any) => state.questions.isLoading);

    const dispatch = useDispatch();

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

    const steps = Array.from({ length: questions.length }, (_, i) => i);

    return (
        <div>
            <Stepper steps={steps} />
            <Questions onCheked={handleCheked} />
            <div className={styles.next_button}>
                <button className={`${styles.btn} ${styles.next}`} onClick={handleNext}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default HorizontalLinearStepper;