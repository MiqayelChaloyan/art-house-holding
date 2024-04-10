import { useSelector } from "react-redux";

import styles from './styles.module.sass';
import { Calibri } from "@/lib/constants/font";


const Step = ({ index, trace }: any) => {
    // const done = trace < current;
    // const currentStep = trace === current;
    // const currentClassName = currentStep ? styles.stepper__step__current : '';
    // const doneClassName = done ? styles.stepper__step__done : '';

    const done = index < trace;
    const activeStep = index === trace;
    const activeClassName = activeStep ? styles.stepper__step__active : '';
    const doneClassName = done ? styles.stepper__step__done : '';
    // const className: string[] = [`stepper__step${activeClassName}${doneClassName}`];


    return <div className={`${styles.stepper__step} ${activeClassName} ${doneClassName}`} />
}



const Stepper = ({ steps }: any) => {
    const trace = useSelector((state: any) => state.questions.trace);
    const questions = useSelector((state: any) => state.questions.quiz);

    // console.log(steps.length, trace)

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
}

export default Stepper;