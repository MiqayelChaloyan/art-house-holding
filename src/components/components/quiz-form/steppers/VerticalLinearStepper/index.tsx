import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer';

import styles from './styles.module.sass';


export default function VerticalLinearStepper() {
  const questions = useSelector((state: any) => state.questions.quiz);
  const trace = useSelector((state: any) => state.questions.trace);
  const result = useSelector((state: any) => state.questions.result);
  const question = useSelector((state: any) => state.questions.quiz[state.questions.trace]);

  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (trace < questions.length - 1) {
      dispatch(Action.moveNextAction())
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    } else {
      console.log(result)
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCheked = (check: any) => {
    if (question.answer === question.options[check]) {
      dispatch(Action.addResult())
    }
  }


  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {questions.map((step: any, index: number) => (
          <Step key={step.question}>
            <StepLabel>
              {step.question}
            </StepLabel>
            <StepContent>
              <Box>
                {
                  step?.options.map((q: any, i: number) => (
                    <div key={i} className={styles.option}>
                      <input value={q} type="checkbox" name="options" id={`q${i}-option`} onChange={() => handleCheked(i)} />
                      <label className={styles.label} htmlFor={`q${i}-option`}>{q}</label>
                    </div>
                  ))
                }
              </Box>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === questions.length - 1 ? 'Ավարտել' : 'Հաջորդը'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === questions.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
