import React from 'react';
import { render } from '@testing-library/react';
import Item from '../Item'; 

describe('Item Component', () => {
  const mockItem = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    phone: '123-456-7890',
    company: { name: 'Example Corp' },
  };

  test('renders item with correct data', () => {
    const { getByText } = render(<Item item={mockItem} />);

    expect(getByText(mockItem.name)).toBeInTheDocument();
    expect(getByText(mockItem.email)).toBeInTheDocument();
    expect(getByText(mockItem.username)).toBeInTheDocument();
    expect(getByText(mockItem.phone)).toBeInTheDocument();
    expect(getByText(mockItem.company.name)).toBeInTheDocument();
  });

  test('renders empty fields correctly', () => {
    const emptyItem = {
      name: '',
      email: '',
      username: '',
      phone: '',
      company: { name: '' },
    };

    const { container } = render(<Item item={emptyItem} />);

    const cells = container.querySelectorAll('td, th');
    cells.forEach(cell => {
      expect(cell).toHaveTextContent(''); 
    });
  });
});
