Cypress.on('uncaught:exception', () => {
  return false;
});
describe('тест конструктора', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
    cy.viewport(1300, 800);
  });

  const noBunSelector1 = '[data-cy=no_bun_text_1]';
  const noBunSelector2 = '[data-cy=no_bun_text_2]';
  const noIngredientsSelector = `[data-cy=no_ingredients_text]`;
  const bunSelector = `[data-cy=bun_0]`;
  const ingredientSelector = `[data-cy=ingredient_0]`;

  it('есть возможность добавлять булку и ингрeдиенты', () => {
    cy.get(noBunSelector1).as('noBunText1');
    cy.get(noBunSelector2).as('noBunText2');
    cy.get(noIngredientsSelector).as('noIngredientsText');
    cy.get(bunSelector + ` button`).as('bun');
    cy.get(ingredientSelector + ` button`).as('ingredient');

    // Проверяем пустоту перед добавлением
    cy.get('@noBunText1', { timeout: 10000 })
      .should('be.visible')
      .contains('Выберите булки');
    cy.get('@noBunText2').contains('Выберите булки');
    cy.get('@noIngredientsText').contains('Выберите начинку');

    cy.get('@bun').click({ multiple: true });
    cy.get('@ingredient').click({ multiple: true });

    cy.get(`[data-cy=constructor_section]`).contains('булка');
    cy.get(`[data-cy=ingredient_element]`);
  });

  it('проверка открытия и закрытия модального окна ингредиента', () => {
    const ingredient = cy.get(bunSelector);
    ingredient.contains('Краторная булка N-200i').click({ multiple: true });
    cy.get(`[data-cy=ingredient_modal]`)
      .contains('Краторная булка N-200i')
      .should('exist');
    //при клике на крестик
    cy.get(`[data-cy=close_modal_btn]`).click();
    cy.get('[data-cy=ingredient_modal]').should('not.exist');
    ingredient.contains('Краторная булка N-200i').click({ multiple: true });
    cy.get(`[data-cy=ingredient_modal]`)
      .contains('Краторная булка N-200i')
      .should('exist');
    //при клике на оверлей
    cy.get('[data-cy=overlay]')
      .should('exist')
      .click('bottomRight', { force: true });
    cy.get('[data-cy=ingredient_modal]').should('not.exist');
  });
});
