import React from 'react'
import EmptyState from './EmptyState'

describe('<EmptyState />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EmptyState />)
  })
})