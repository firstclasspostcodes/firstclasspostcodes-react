describe('<PostcodeLookup />', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('LOCATION'));

    const fixturesUrl = `${Cypress.env('API_URL')}/data/.postcodes`;

    cy.request({ url: fixturesUrl })
      .then((res) => res.body)
      .then((fixtures) => fixtures[Math.floor(Math.random() * fixtures.length)])
      .as('fixture');
  });

  describe('when a postcode is entered and the button is clicked', () => {
    it('retrieves and fills a matching address', () => {
      cy.get('.test-input-input').as('input');
      cy.get('.test-input-button').as('button');
      cy.get('@fixture').then(({ postcode }) =>
        cy.get('@input').type(postcode)
      );
      cy.get('@button').click();
      cy.get('.test-select-select').as('select');
      cy.get('@select')
        .children()
        .eq(1)
        .then((option) => {
          cy.get('@select').select(option.val());
        });
      cy.get('@fixture').then(({ postcode }) => {
        cy.get('.test-postcode-input').should('have.value', postcode);
      });
    });
  });
});
