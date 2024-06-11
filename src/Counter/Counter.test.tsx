import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Counter from './Counter'

describe('Test Counter.test', () => {
  let initialCount: number
  beforeEach(() => {
    initialCount = 0
  })

  it('Should render a counter with 0 count', () => {
    render(<Counter initialCount={initialCount} />)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('0')
  })

  it('Should increment by one if user click on the add button', async () => {
    // user.setup()
    render(<Counter initialCount={initialCount} />)
    const incrementButton = screen.getByRole('button', { name: 'Add' })
    await user.click(incrementButton)
    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('1')
  })
})