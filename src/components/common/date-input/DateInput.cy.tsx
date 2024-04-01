import DateInput, { DateInputProps } from './DateInput';

describe('<DateInput />', () => {

  const mount = (props?: Partial<DateInputProps>) => {
    const onChangeSpy = cy.spy().as('onChangeSpy');

    return cy.mount(
      <DateInput
        min='03-04-2024'
        title='field title'
        onChange={onChangeSpy}
        value=''
        {...props}
      />);
  };

  beforeEach(() => {
    mount();
  });

  context('render tests', () => {
    it('renders default', () => {
      cy.dataCy('date-field')
        .should('have.text', 'field title');

      cy.dataCy('date-field-input')
        .should('have.attr', 'type', 'date')
        .and('have.attr', 'value', '')
        .and('have.attr', 'min', '03-04-2024');
    });

    it('renders with props value', () => {
      const propValue = '12-11-2024';

      mount({ value: propValue });

      cy.dataCy('date-field-input')
        .and('have.attr', 'value', propValue);
    });
  });

  context('behavior tests', () => {
    it('calls onChange', () => {
      const newValue = '2024-08-14';

      cy.dataCy('date-field-input')
        .type(newValue);

      cy.get('@onChangeSpy')
        .should('be.calledOnce');

      cy.dataCy('date-field-input')
        .should('have.value', newValue);
    });

  });


});