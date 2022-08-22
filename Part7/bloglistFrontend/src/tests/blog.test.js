import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from '../components/blog'

describe('<Blog/>', () => {
  let component
  const testBlog = {
    title: 'testingTitle',
    author: 'testingAuthor',
    url: 'www.testingBlog.com',
    likes: 2,
    user: {
      username: 'usernameTest',
      name: 'usernameTest'
    }
  }

  const mockHandleLikes = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={testBlog}
        handleLikes={mockHandleLikes}
      />
    )
  })

  test('render collapsed blog content', () => {
    expect(component.queryByTestId('blog')).toHaveTextContent(testBlog.title)
    expect(component.queryByTestId('blog')).toHaveTextContent(testBlog.author)
    expect(component.queryByTestId('blog')).not.toHaveTextContent(testBlog.url)
    expect(component.queryByTestId('blog')).not.toHaveTextContent(testBlog.likes)
  })

  test('render expanded blog content', () => {
    const view = screen.getByText('view')
    fireEvent.click(view)

    expect(component.queryByTestId('blog')).toHaveTextContent(testBlog.url)
    expect(component.queryByTestId('blog')).toHaveTextContent(testBlog.likes)
  })

  test('when the like button is clicked twice the handler fires twice', () => {
    const view = screen.getByText('view')
    fireEvent.click(view)

    const like = screen.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandleLikes).toHaveBeenCalledTimes(2)

  })

})
