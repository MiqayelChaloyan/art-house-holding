import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import stateModal from './modal_reducer';
import statePlayer from './player_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    modal: stateModal,
    player: statePlayer
})

export default configureStore({ reducer : rootReducer});