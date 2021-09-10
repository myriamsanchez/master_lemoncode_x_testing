import React from 'react';
import { render, screen } from '@testing-library/react';
import { SelectComponent } from './select.component';
import { Lookup } from 'common/models';

describe('common/components/form/select/select.component specs', () => {
  it('should render a select element when it feeds required props and three items', () => {
    // Arrange
    const props = {
      items: [
        {
          id: '1',
          name: 'Item 1'
        },
        {
          id: '2',
          name: 'Item 2'
        },
        {
          id: '3',
          name: 'Item 3'
        }
      ] as Lookup[],
      label: 'Test label',
      value: '',
    };

    // Act
    render(<SelectComponent {...props} />);

    const selectElement = screen.getByRole('button', {name: 'Test label'});

    // Assert
    expect(selectElement).toBeInTheDocument();
  });
});