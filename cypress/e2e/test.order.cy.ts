const API_URL = Cypress.env('BURGER_API_URL');
describe('тест заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'newOrder.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.visit('http://localhost:4000');
    cy.viewport(1300, 800);
  });
  const noBunSelector1 = `[data-cy=no_bun_text_1]`;
  const noBunSelector2 = `[data-cy=no_bun_text_2]`;
  const noIngredientsSelector = `[data-cy=no_ingredients_text]`;
  const bunSelector = `[data-cy=bun_0]`;
  const ingredientSelector = `[data-cy=ingredient_0]`;
  afterEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  it('проверка нового заказа', () => {
    cy.get(noBunSelector1).as('noBunText1');
    cy.get(noBunSelector2).as('noBunText2');
    cy.get(noIngredientsSelector).as('noIngredientsText');
    cy.get(bunSelector + ` button`).as('bun');
    cy.get(ingredientSelector + ` button`).as('ingredient');
    const bun = cy.get(bunSelector + ` button`);
    const ingredient = cy.get(ingredientSelector + ` button`);
    bun.click({ multiple: true });
    ingredient.click({ multiple: true });
    cy.get(`[data-cy=new_order_total] button`)
      .contains('Оформить заказ')
      .click();
    cy.wait('@postOrder');
    cy.get(`[data-cy=new_order_number]`).contains('40763').should('exist');
    cy.get(`[data-cy=close_modal_btn]`).click();
    cy.get('[data-cy=modal]').should('not.exist');
    // Проверяем пустоту после закрытия модалки
    cy.get(noBunSelector1).as('noBunText1');
    cy.get(noBunSelector2).as('noBunText2');
    cy.get(noIngredientsSelector).as('noIngredientsText');
    cy.get('@noBunText1').contains('Выберите булки');
    cy.get('@noBunText2').contains('Выберите булки');
    cy.get('@noIngredientsText').contains('Выберите начинку');
  });
});
