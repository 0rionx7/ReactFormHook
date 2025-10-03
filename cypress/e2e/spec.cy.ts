describe('Registration flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=username]').as('username');
    cy.get('[data-cy=password]').as('password');
    cy.get('[data-cy=confirmPassword]').as('confirmPassword');
    cy.get('[data-cy=submit]').as('submit');
  });

  describe('Step 1 – Account details', () => {
    it('fails to pass step 1 when password and confirmPassword do not match', () => {
      cy.get('@username').type('username');
      cy.get('@password').type('password');
      cy.get('@confirmPassword').type('differentPassword');
      cy.get('@submit').click();
      cy.get('[data-cy="Confirm password-error"]').should(
        'contain',
        `passwords don't match`,
      );
    });
    it('successfully passes step 1 when password and confirmPassword matches', () => {
      cy.get('@username').type('username');
      cy.get('@password').type('password');
      cy.get('@confirmPassword').type('password');
      cy.get('@submit').click();
      cy.contains('Provide your personal info');
    });
  });

  describe('Step 2 – Personal info', () => {
    beforeEach(() => {
      cy.get('@username').type('username');
      cy.get('@password').type('password');
      cy.get('@confirmPassword').type('password');
      cy.get('@submit').click();
      cy.get('[data-cy="firstName"]').as('firstName');
      cy.get('[data-cy=lastName]').as('lastName');
      cy.get('[data-cy=dateOfBirth]').as('dateOfBirth');
      cy.get('[data-cy=country]').as('country');
    });
    it('validates username should not contain lastName', () => {
      cy.get('@firstName').type('firstName');
      cy.get('@lastName').type('name');
      cy.get('@country').select('Greece');
      cy.get('@dateOfBirth').click();
      cy.get('[aria-label="Choose the Month"]').select('Jan');
      cy.get('[aria-label="Choose the Year"]').select('1990');
      cy.get('[data-day="1/1/1990"]').click();
      cy.get('button[type=submit]').click();
      cy.get('[data-cy="Last Name-error"]').should(
        'contain',
        'username should not contain lastName',
      );
    });
    it('validates user must be over 18', () => {
      cy.get('@firstName').type('firstName');
      cy.get('@lastName').type('lastName');
      cy.get('@country').select('Greece');
      cy.get('@dateOfBirth').click();
      cy.get('[aria-label="Choose the Month"]').select('Jan');
      cy.get('[aria-label="Choose the Year"]').select('2018');
      cy.get('[data-day="1/1/2018"]').click();
      cy.get('button[type=submit]').click();
      cy.get('[data-cy="dateOfBirth-error"]').should(
        'contain',
        'You must be over 18',
      );
    });
    it('successfully passes validation when user is over 18 and lastName is not in username', () => {
      cy.get('@firstName').type('firstName');
      cy.get('@lastName').type('lastName');
      cy.get('@country').select('Greece');
      cy.get('@dateOfBirth').click();
      cy.get('[aria-label="Choose the Month"]').select('Jan');
      cy.get('[aria-label="Choose the Year"]').select('2000');
      cy.get('[data-day="1/1/2000"]').click();
      cy.get('button[type=submit]').click();
      cy.get('[data-cy="registered"]');
    });
  });
});
