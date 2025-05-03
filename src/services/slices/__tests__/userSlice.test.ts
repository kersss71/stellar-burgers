import reducer, {
  registerUser,
  loginUser,
  logoutUser,
  updateUser
} from '../userSlice';

export const initialState = {
  isAuth: false,
  user: null,
  isLoading: false,
  error: null
};

const userMockData = {
  email: 'test@test.mail',
  name: 'test'
};

const userMockDataRegister = {
  email: 'test@test.mail',
  name: 'test',
  password: 'test'
};

describe('Тесты редюсера userReducer', () => {
  describe('Тесты registerUser asyncThunk', () => {
    it('registerUser.pending', () => {
      const state = reducer(
        initialState,
        registerUser.pending('pending', userMockDataRegister)
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('registerUser.fulfilled', () => {
      const state = reducer(
        initialState,
        registerUser.fulfilled(userMockData, 'fulfilled', userMockDataRegister)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.user).toEqual(userMockData);
    });

    it('registerUser.rejected', () => {
      const state = reducer(
        initialState,
        registerUser.rejected(
          new Error('error'),
          'rejected',
          userMockDataRegister
        )
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
  describe('Тесты loginUser asyncThunk', () => {
    it('loginUser.pending', () => {
      const state = reducer(
        initialState,
        loginUser.pending('pending', userMockDataRegister)
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('loginUser.fulfilled', () => {
      const state = reducer(
        initialState,
        loginUser.fulfilled(userMockData, 'fulfilled', userMockDataRegister)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.user).toEqual(userMockData);
    });

    it('loginUser.rejected', () => {
      const state = reducer(
        initialState,
        loginUser.rejected(new Error('error'), 'rejected', userMockDataRegister)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
      expect(state.isAuth).toBeTruthy();
    });
  });
  describe('Тесты logoutUser asyncThunk', () => {
    it('logoutUser.pending', () => {
      const state = reducer(initialState, logoutUser.pending('pending'));

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('logoutUser.fulfilled', () => {
      const state = reducer(
        initialState,
        logoutUser.fulfilled(true, 'fulfilled')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.user).toBeNull();
    });

    it('logoutUser.rejected', () => {
      const state = reducer(
        initialState,
        logoutUser.rejected(new Error('error'), 'rejected')
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
  describe('Тесты updateUser asyncThunk', () => {
    it('updateUser.pending', () => {
      const state = reducer(
        initialState,
        updateUser.pending('pending', userMockData)
      );

      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('updateUser.fulfilled', () => {
      const state = reducer(
        initialState,
        updateUser.fulfilled(userMockData, 'fulfilled', userMockData)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.user).toEqual(userMockData);
    });

    it('updateUser.rejected', () => {
      const state = reducer(
        initialState,
        updateUser.rejected(new Error('error'), 'rejected', userMockData)
      );

      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeTruthy();
    });
  });
});
