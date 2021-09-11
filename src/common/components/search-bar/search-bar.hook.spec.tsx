import { renderHook, act } from "@testing-library/react-hooks";
import * as commonHooks from 'common/hooks/debounce.hook';
import { useSearchBar } from "./search-bar.hook";

describe("common/components/search-bar/search-bar.hook specs", () => {
  let colors = [];
  
  beforeEach(() => {
    colors = [
      { 
        id: 1,
        name: 'red'
      },
      {
        id: 2,
        name: 'blue'
      },
      {
        id: 3,
        name: 'green'
      },
    ];
  });

  it('should return search text, onSearch method and filteredList when it feeds colors array and "name" field', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useSearchBar(colors, ['name']));

    // Assert
    expect(result.current.search).toEqual('');
    expect(result.current.onSearch).toEqual(expect.any(Function));
    expect(result.current.filteredList).toEqual(colors);
  });

  it('should return filteredList with one element equals red when it calls onSearch method with "red" text', async () => {
    // Arrange

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useSearchBar(colors, ['name']));

    act(() => result.current.onSearch('red'));

    await waitForNextUpdate();

    // Assert
    expect(result.current.search).toEqual('red');
    expect(result.current.filteredList).toEqual([colors[0]]);
  });

  it('should call useDebounce hook when it renders', () => {
    // Arrange
    const debounceSearchStub = jest.spyOn(commonHooks, 'useDebounce');

    // Act
    renderHook(() => useSearchBar(colors, ['name']));

    // Assert
    expect(debounceSearchStub).toHaveBeenCalledWith('', 250);
  });
});