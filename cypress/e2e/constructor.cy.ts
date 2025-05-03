import * as orderFixture from '../fixtures/order.json';

const TEST_URL = 'localhost:3000';
const BUN_INGREDIENT = '[data-cy-ingredient="bun"]';
const MODALS = '#modals';

describe('E2E тест конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit(TEST_URL);
  });

  it('Список ингредиентов', () => {
    cy.get(BUN_INGREDIENT).should('have.length.at.least', 1);
    cy.get('[data-cy-ingredient="main"],[data-cy-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка работы модальных окон', () => {
    describe('Проверка открытия модальных окон', () => {
      it('открытие по карточке ингредиента', () => {
        cy.get(`${BUN_INGREDIENT}:first-of-type`).click();
        cy.get(MODALS).children().should('have.length', 2);
      });

      it('При перезагрузке', () => {
        cy.get(`${BUN_INGREDIENT}:first-of-type`).click();
        cy.reload(true);
        cy.get(MODALS).children().should('have.length', 2);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через крестик', () => {
        cy.get(`${BUN_INGREDIENT}:first-of-type`).click();
        cy.get(`${MODALS} button:first-of-type`).click();
        cy.wait(500);
        cy.get(MODALS).children().should('have.length', 0);
      });

      it('Через оверлей', () => {
        cy.get(`${BUN_INGREDIENT}:first-of-type`).click();
        cy.get(`${MODALS}>div:nth-of-type(2)`).click({ force: true });
        cy.wait(500);
        cy.get(MODALS).children().should('have.length', 0);
      });

      it('Через esc', () => {
        cy.get(`${BUN_INGREDIENT}:first-of-type`).click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get(MODALS).children().should('have.length', 0);
      });
    });
  });

  describe('Процесс заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

      cy.visit(TEST_URL);
    });

    it('Базовая процедура оформления', () => {
      cy.get(`${BUN_INGREDIENT} button`).click();
      cy.get('[data-cy-order-button]').click();

      cy.get(MODALS).children().should('have.length', 2);

      cy.get(`${MODALS} h2:first-of-type`).should(
        'have.text',
        orderFixture.order.number
      );

      cy.get(`${MODALS} button:first-of-type`).click();
      cy.wait(500);
      cy.get(MODALS).children().should('have.length', 0);
    });

    afterEach(() => {
      // Очистка фейковых токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
