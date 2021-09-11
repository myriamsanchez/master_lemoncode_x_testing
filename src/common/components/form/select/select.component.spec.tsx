import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lookup } from 'common/models';
import React from 'react';
import { SelectComponent } from './select.component';

describe('common/components/form/select/select.component specs', () => {
  let props;

  beforeEach(() => {
    props = {
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
  });

  it('should render a select element when it feeds required props and three items', () => {
    // Arrange

    // Act
    render(<SelectComponent {...props} />);

    const selectElement = screen.getByRole('button', {name: 'Test label'});

    // Assert
    expect(selectElement).toBeInTheDocument();
  });

  it('should render a menu with three item when it clicks on select element', () => {
    // Arrange

    // Act
    render(<SelectComponent {...props} />);

    const selectElement = screen.getByRole('button', {name: 'Test label'});
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    userEvent.click(selectElement);
    const menuElement = screen.getByRole('listbox');
    const itemElementList = screen.getAllByRole('option');

    // Assert
    expect(menuElement).toBeInTheDocument();
    expect(itemElementList).toHaveLength(props.items.length);
  });

  it('should calls onChange method with value equals 2 when it clicks on second item', () => {
    // Arrange
    props = {
      ...props,
      onChange: jest.fn(),
    }

    // Act
    render(<SelectComponent {...props} />);

    const selectElement = screen.getByRole('button', { name: 'Test label' });
    
    userEvent.click(selectElement);
    const itemElementList = screen.getAllByRole('option');
    userEvent.click(itemElementList[1]);

    // Assert
    expect(props.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: {value: '2' }}),
      expect.anything()
    );
  });
});