import mockIngredients from '../fixtures/ingredients.json';

describe('Тесты конструктора бургера', () => {
  beforeEach(() => {
    // Перехватываем запрос к API ингредиентов и возвращаем мок
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    // Заходим на страницу конструктора
    cy.visit('http://localhost:4000');

    cy.wait('@getIngredients');
  });

  it('должен отображать список ингредиентов', () => {
    cy.contains('Соберите бургер').should('exist');
  });

  it('добавление ингредиентов в конструктор', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';
    const ingredientId = '643d69a5c3f7b9001cfa0941';
    const sauceId = '643d69a5c3f7b9001cfa0942';

    // Находим <li> по data-cy=id
    cy.get(`[data-cy="${bunId}"]`)
      // внутри него ищем кнопку "Добавить"
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${ingredientId}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    cy.get(`[data-cy="${sauceId}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что ингредиент появился в конструкторе
    cy.get('[data-cy=burger-constructor]').within(() => {
      cy.contains('Краторная булка N-200i').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });
  });

  it('открытие модального окна ингредиента и закрытие по клику на крестик', () => {
    const ingredientId = '643d69a5c3f7b9001cfa0941';

    // Открытие окна
    cy.get(`[data-cy="${ingredientId}"]`).find('a').click();

    // Проверяем, что модалка открылась
    cy.get('#modals').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    // Закрытие по клику на крестик
    cy.get('#modals').find('button').click();

    // Проверяем, что модалка закрылась
    cy.get('#modals').should('be.empty');
  });

  it('открытие модального окна ингредиента и закрытие по клику на оверлей', () => {
    const ingredientId = '643d69a5c3f7b9001cfa0941';

    // Открытие окна
    cy.get(`[data-cy="${ingredientId}"]`).find('a').click();

    // Проверяем, что модалка открылась
    cy.get('#modals').within(() => {
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    // Закрытие по клику на оверлей
    cy.get('[data-cy=modal-overlay]').click({ force: true });

    // Проверяем, что модалка закрылась
    cy.get('#modals').should('be.empty');
  });

  it('создание заказа', () => {
    // Сохраняем токены
    cy.setCookie('accessToken', 'mockedAccessToken');
    window.localStorage.setItem('refreshToken', 'mockedRefreshToken');

    // Перехватываем запрос данных пользователя
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    // Перехватываем запрос на создание заказа
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('http://localhost:4000');
    cy.wait('@getUser');

    // Находим ингредиенты и добавляем их в конструктор
    const bunId = '643d69a5c3f7b9001cfa093d';
    const ingredientId = '643d69a5c3f7b9001cfa0941';

    cy.get(`[data-cy="${bunId}"]`).find('button').contains('Добавить').click();

    cy.get(`[data-cy="${ingredientId}"]`)
      .find('button')
      .contains('Добавить')
      .click();

    // Нажимаем кнопку "Оформить заказ"
    cy.get('button').contains('Оформить заказ').click();

    // Проверяем, что модалка открылась
    cy.get('#modals').within(() => {
      cy.contains('92361').should('exist');
    });

    // Закрытие по клику на крестик
    cy.get('#modals').find('button').click();

    // Проверяем, что модалка закрылась
    cy.get('#modals').should('be.empty');

    // Проверяем, что цена заказа = 0. Это значит, что конструктор пуст
    cy.get('[data-cy=order-price]').should('have.text', '0');

    // Очищаем токены
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });
});
