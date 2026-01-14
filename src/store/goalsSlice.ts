import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Goal {
  id: string;
  text: string;
}

interface GoalsState {
  goals: Goal[];
}

const initialState: GoalsState = {
  goals: [],
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<string>) => {
      state.goals.push({
        id: Date.now().toString(),
        text: action.payload,
      });
    },

    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(
        goal => goal.id !== action.payload
      );
    },

    editGoal: (state,action: PayloadAction<{ id: string; newText: string }>) => {
      const index = state.goals.findIndex(
        goal => goal.id === action.payload.id
      );

      if (index !== -1) {
        state.goals[index].text = action.payload.newText;
      }
    },
  },
});

export const { addGoal, deleteGoal, editGoal } = goalsSlice.actions;
export default goalsSlice.reducer;
