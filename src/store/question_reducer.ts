import { createSlice } from '@reduxjs/toolkit';

export interface Questions {
        quiz: any
        trace: number
        result: number
        answer: any
        isLoading: boolean
        isViewAnswer: boolean
}

const initialState: Questions = {
        quiz: [],
        trace: 0,
        result: 0,
        answer: [],
        isLoading: false,
        isViewAnswer: false,
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
        addResult: (state) => {
            return {
                ...state,
                result: state.result + 1,
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
                result: 0,
                answer: [],
                isLoading: false,
                isViewAnswer: false,
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
        }
    }
})

export const { startExamAction, moveNextAction, movePrevAction, addResult, resetAllAction, updateLoader, viewAnswer, addedAnswer } = questionReducer.actions;

export default questionReducer.reducer;