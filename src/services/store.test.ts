import store, { rootReducer } from './store';

describe('Тестирование инициализации rootReducer', () => {
  it('Проверка инициализации rootReducer', () => {
    const beforeState = store.getState();

    const afterState = rootReducer(undefined, { type: 'test' });

    expect(afterState).toEqual(beforeState);
  });
});
