'use client'

import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer'

import Questions from '../../questions';

import CircularProgressBar from '@/lib/ui/circular_progress';
import { Calibri } from '@/lib/constants/font';

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
    const [isResultView, setIsResultView] = useState(false);
    const [isDisable, setIsDisable] = useState(false);

    const question = useSelector((state: any) => state.questions?.quiz[state.questions.trace]);
    const score = useSelector((state: any) => state.questions?.score);

    const steps = Array.from({ length: questions.length }, (_, i) => i);

    const dispatch = useDispatch();


    const handleNext = () => {
        if (trace < questions.length - 1) {
            dispatch(Action.moveNextAction())
        } else {
            console.log(score)
            setIsResultView(true)
        }
    };


    const handleBack = () => {
        dispatch(Action.movePrevAction())
    };

    const handleCheked = (check: string) => {
        if (question.answer === question.options[check]) {
            dispatch(Action.addScore());
            dispatch(Action.addedAnswer({
                question: question.question,
                wrongAnswer: false,
                correctAnswer: question.answer
            }))
        } else {
            dispatch(Action.addedAnswer({
                question: question.question,
                wrongAnswer: question.options[check],
                correctAnswer: question.answer
            }));
        }
    };


    const handleView = () => dispatch(Action.viewAnswer());


    return (
        <>
            {
                !isResultView ?
                    <div>
                        <Stepper steps={steps} />
                        <Questions onCheked={handleCheked} setIsDisable={setIsDisable}/>
                        <div className={styles.next_button}>
                            {/* {trace > 0 &&
                                <button
                                    className={`${styles.btn} ${styles.back}`}
                                    onClick={handleBack}
                                >
                                    <FaArrowLeft />
                                </button>
                            } */}
                            <button
                                className={`${styles.btn} ${styles.next}`}
                                onClick={handleNext}
                                // disabled={!isDisable}
                                // style={{backgroundColor: !isDisable ? 'red' : 'green'}}
                            >
                                {trace !== questions.length - 1 ? <FaArrowRight /> : <span>Submit</span>}
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <CircularProgressBar />
                        <p>{score}</p>
                        <button onClick={handleView}>view</button>
                    </div>
            }
        </>

    )
}

export default HorizontalLinearStepper;