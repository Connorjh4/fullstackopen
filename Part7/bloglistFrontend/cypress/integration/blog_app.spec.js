describe('Blog app', function() {
  const user = [
    {
      name: 'connor hauenstein',
      username: 'usernameTest',
      password: 'superSafePassword'
    },
    {
      name: 'Wroooonnnnng',
      username: 'wrongUsername',
      password: 'superSafePassword'
    }
  ]

  const blog = [
    {
      title: 'testBlog',
      author: 'connor',
      likes: 6,
      url: 'www.testing.com'
    },
    {
      title: 'test-Blog2',
      author: 'itsME',
      likes: 4,
      url: 'www.testingTwoBlogs.com'
    },
    {
      title: 'test_Blog4',
      author: 'its_notME',
      likes: 2,
      url: 'www.testingThreeBlogs.com'
    }
  ]

  beforeEach( function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user[0])
    cy.request('POST', 'http://localhost:3003/api/users', user[1])
    cy.visit('/')
  })

  it('Login form is shown', function() {
    cy.contains('Log into application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('login succeeds', function() {
      cy.loginUi(user[0])
      cy.contains(`Welcome ${user[0].name}`)
    })

    it('login fails', function() {
      cy.get('[data-testid=username-input]').type(user[0].username)
      cy.get('[data-testid=password-input]').type('wrongPassword')
      cy.get('[data-testid=login-btn]').click()
      cy.get('[data-testid=error-msg]').should('have.css', 'color', 'rgb(143, 53, 53)')
      cy.contains('Wrong credentials')
    })
  })

  describe('already logged in', function() {
    beforeEach( function() {
      cy.loginServer(user[0])
    })

    it('Post blog', function() {
      cy.createBlogUi(blog[0])
      cy.contains(`a new blog '${blog[0].title}' by ${blog[0].author}`)
    })

    describe('Already a blog', function() {
      beforeEach( function() {
        cy.createBlogServer(blog[1])
      })

      it('Like blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains(`likes ${blog[1].likes + 1}`)
      })

      it('delete blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('windows:confirm', () => true)
      })

      it('unauthorized user cant delete blog', function() {
        cy.contains('logout').click()
        cy.loginServer(user[1])
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('windows:confirm', () => true)
        cy.contains('Error')
      })

      describe('contains multiple blogs', function() {
        beforeEach( function() {
          cy.createBlogServer(blog[0])
          cy.createBlogServer(blog[2])
        })

        it('blogs in order of likes', function() {
          cy.get('[data-testid=blog]')
            .should('have.length', 3)
            .then((b) => {
              expect(b[0].textContent).contains(blog[0].title)
              expect(b[2].textContent).contains(blog[2].title)
            })
        })
      })
    })
  })
})
