import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import stateModal from './modal_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    modal: stateModal
})

export default configureStore({ reducer : rootReducer});