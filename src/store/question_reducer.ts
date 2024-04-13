import { createSlice } from '@reduxjs/toolkit';

export interface Questions {
    quiz: any
    trace: number
    score: number
    answer: any
    isLoading: boolean
    isViewAnswer: boolean
    checkBoxes: any

}

const initialCheckBoxes = [
    { value: '', id: 0, isChecked: false },
    { value: '', id: 1, isChecked: false },
    { value: '', id: 2, isChecked: false },
    { value: '', id: 3, isChecked: false }
]

const initialState: Questions = {
    quiz: [],
    trace: 0,
    score: 0,
    answer: [],
    isLoading: false,
    isViewAnswer: false,
    checkBoxes: initialCheckBoxes
};

export const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        startExamAction: (state, action) => {
            let quiz = action.payload

            return {
                ...state,
                quiz: quiz,
            }
        },
        addScore: (state) => {
            return {
                ...state,
                score: state.score + 1,
            }
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1
            }
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1
            }
        },
        resetAllAction: () => {
            return {
                quiz: [],
                trace: 0,
                score: 0,
                answer: [],
                isLoading: false,
                isViewAnswer: false,
                checkBoxes: initialCheckBoxes
            }
        },
        updateLoader: (state, action) => {
            return {
                ...state,
                isLoading: action.payload
            }
        },
        viewAnswer: (state) => {
            return {
                ...state,
                isViewAnswer: !state.isViewAnswer
            }
        },
        addedAnswer: (state, action) => {
            state.answer.push(action.payload)
        },
        changeInitialCheckBoxes: (state) => {
            return {
                ...state,
                checkBoxes: initialCheckBoxes
            }
        },
        changeCheckBoxes: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                checkBoxes: action.payload
            }
        },
    }
})

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    addScore,
    resetAllAction,
    updateLoader,
    viewAnswer,
    addedAnswer,
    changeInitialCheckBoxes,
    changeCheckBoxes
} = questionReducer.actions;

export default questionReducer.reducer;