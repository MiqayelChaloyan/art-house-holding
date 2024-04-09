import { createSlice } from '@reduxjs/toolkit';

export interface statePlayer {
	isPlay: boolean
}

const initialState: statePlayer = {
	isPlay: false
};

export const statePlayer = createSlice({
	name: 'player',
	initialState,
	reducers: {
		onPlay: (_, action) => {
			const isPlay = action.payload;
			return {
				isPlay
			}
		},
		onPause: (_, action) => {
			const isPlay = action.payload;
			return {
				isPlay
			}
		}
	},
});

export const { onPlay, onPause } = statePlayer.actions;

export default statePlayer.reducer;