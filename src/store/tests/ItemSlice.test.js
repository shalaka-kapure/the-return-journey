import reducer, { fetchItems, setSearchTerm } from '../itemSlice';

describe('itemSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
    searchTerm: '',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setSearchTerm', () => {
    const newState = reducer(initialState, setSearchTerm('test'));
    expect(newState.searchTerm).toEqual('test');
  });

  it('should handle fetchItems pending', () => {
    const newState = reducer(initialState, fetchItems.pending());
    expect(newState.status).toEqual('loading');
  });

  it('should handle fetchItems fulfilled', () => {
    const items = [{ id: 1, name: 'Test User' }];
    const newState = reducer(initialState, fetchItems.fulfilled(items));
    expect(newState.status).toEqual('succeeded');
    expect(newState.items).toEqual(items);
  });

  it('should handle fetchItems rejected', () => {
    const error = 'Failed to fetch item data';
    const newState = reducer(initialState, fetchItems.rejected({ message: error }));
    expect(newState.status).toEqual('failed');
    expect(newState.error).toEqual(error);
  });
});
