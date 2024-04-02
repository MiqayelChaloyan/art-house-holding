import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
    name: 'questions',
    initialState: {
        quiz: [],
        trace: 0,
        result: 0,
        isLoading: false
    },
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
                isLoading: false
            }
        },
        updateLoader: (state, action) => {
            return {
                ...state,
                isLoading: action.payload
            }
        }
    }
})

export const { startExamAction, moveNextAction, movePrevAction, addResult, resetAllAction, updateLoader } = questionReducer.actions;

export default questionReducer.reducer;