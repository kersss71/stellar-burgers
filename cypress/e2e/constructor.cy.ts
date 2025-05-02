import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });

    cy.visit('localhost:3000');
  });

  it('Список ингредиентов', () => {
    cy.get('[data-cy-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy-ingredient="main"],[data-cy-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка работы модальных окон', () => {
    describe('Проверка открытия модальных окон', () => {
      it('открытие по карточке ингредиента', () => {
        cy.get('[data-cy-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('При перезагрузке', () => {
        cy.get('[data-cy-ingredient="bun"]:first-of-type').click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Проверка закрытия модальных окон', () => {
      it('Через крестик', () => {
        cy.get('[data-cy-ingredient="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через оверлей', () => {
        cy.get('[data-cy-ingredient="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Через esc', () => {
        cy.get('[data-cy-ingredient="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
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

      cy.visit('localhost:3000');
    });

    it('Базовая процедура оформления', () => {
      cy.get('[data-cy-ingredient="bun"] button').click();
      cy.get('[data-cy-order-button]').click();

      cy.get('#modals').children().should('have.length', 2);

      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );

      cy.get('#modals button:first-of-type').click();
      cy.wait(500);
      cy.get('#modals').children().should('have.length', 0);
    });

    afterEach(() => {
      // Очистка фейковых токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
