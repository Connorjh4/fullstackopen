Cypress.Commands.add('loginServer', ( user ) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    body: user
  }).then( res => {
    localStorage.setItem('loggedBlogUser', JSON.stringify(res.body))
    cy.visit('/')
  })
})

Cypress.Commands.add('loginUi', ( user ) => {
  cy.get('[data-testid=username-input]').type(user.username)
  cy.get('[data-testid=password-input]').type(user.password)
  cy.get('[data-testid=login-btn]').click()
})

Cypress.Commands.add('createBlogServer', ( blog ) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
  cy.visit('/')
})

Cypress.Commands.add('createBlogUi', ( blog ) => {
  cy.contains('new post').click()
  cy.get('[data-testid=title-input]').type(blog.title)
  cy.get('[data-testid=author-input]').type(blog.author)
  cy.get('[data-testid=url-input]').type(blog.url)
  cy.contains('Post').click()
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })