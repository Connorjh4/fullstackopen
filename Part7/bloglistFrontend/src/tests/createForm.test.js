import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CreateForm from '../components/createForm'

describe('<createForm/>', () => {
  let component
  const mockCreateBlog = jest.fn()

  beforeEach(() => {
    component = render(<CreateForm createBlog={mockCreateBlog}/>)
  })

  test('form has all inputs', () => {
    expect(component.queryByTestId('createForm')).toBeInTheDocument()
    expect(component.queryByTestId('title-input')).toBeInTheDocument()
    expect(component.queryByTestId('author-input')).toBeInTheDocument()
    expect(component.queryByTestId('url-input')).toBeInTheDocument()
  })

  test('form calls eventHandle it received as props with the right details when a blog is created', () => {
    const form = component.queryByTestId('createForm')
    const title = component.queryByTestId('title-input')
    const author = component.queryByTestId('author-input')
    const url = component.queryByTestId('url-input')

    fireEvent.change( title, {
      target: { value: 'titleChange' }
    })
    fireEvent.change( author, {
      target: { value: 'authorChange' }
    })
    fireEvent.change( url, {
      target: { value: 'urlChange' }
    })
    fireEvent.submit(form)

    expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('titleChange')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('authorChange')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('urlChange')

  })

})
