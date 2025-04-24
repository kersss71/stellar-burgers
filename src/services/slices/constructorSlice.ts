import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients?.push({ ...action.payload, id: nanoid() });
      }
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; type: 'up' | 'down' }>
    ) {
      if (action.payload.type === 'down') {
        const position = action.payload.index;
        if (position < state.ingredients.length - 1) {
          const ingredient = state.ingredients[position];
          state.ingredients.splice(position, 1);
          state.ingredients.splice(position + 1, 0, ingredient);
        }
      }
      if (action.payload.type === 'up') {
        const position = action.payload.index;
        if (position > 0) {
          const ingredient = state.ingredients[position];
          state.ingredients.splice(position, 1);
          state.ingredients.splice(position - 1, 0, ingredient);
        }
      }
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
