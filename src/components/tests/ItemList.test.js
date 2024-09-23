import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ItemList from '../ItemList';

const mockStore = configureStore([]);

describe('ItemList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      items: {
        items: [],
        status: 'idle',
        error: null,
        searchTerm: '',
      },
    });
  });

  test('renders loading state', () => {
    store = mockStore({
      items: { status: 'loading' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  test('renders error message', () => {
    store = mockStore({
      items: { status: 'failed', error: 'Fetch failed' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/Error: Fetch failed/)).toBeInTheDocument();
  });

  test('renders items', () => {
    const items = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', phone: '1234567890', company: 'Company A' },
    ];
    store = mockStore({
      items: { items, status: 'succeeded' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  test('filters items by name', () => {
    const items = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', phone: '1234567890', company: 'Company A' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', phone: '0987654321', company: 'Company B' },
    ];
    store = mockStore({
      items: { items, status: 'succeeded', searchTerm: 'john' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.queryByText(/Jane Smith/)).not.toBeInTheDocument();
  });

  test('shows no items found message when no matches', () => {
    store = mockStore({
        items: { items: [], status: 'succeeded', searchTerm: 'nonexistent' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/No items found/i)).toBeInTheDocument();
});

  test('search is case insensitive', () => {
    const items = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', phone: '1234567890', company: 'Company A' },
    ];
    store = mockStore({
      items: { items, status: 'succeeded', searchTerm: 'JOHN' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  test('filters items by email', () => {
    const items = [
      { id: 1, name: 'John Doe', email: 'john@example.com', username: 'johndoe', phone: '1234567890', company: 'Company A' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', username: 'janesmith', phone: '0987654321', company: 'Company B' },
    ];
    store = mockStore({
      items: { items, status: 'succeeded', searchTerm: 'jane@example.com' },
    });
    render(<Provider store={store}><ItemList /></Provider>);
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
    expect(screen.queryByText(/John Doe/)).not.toBeInTheDocument();
  });
});
