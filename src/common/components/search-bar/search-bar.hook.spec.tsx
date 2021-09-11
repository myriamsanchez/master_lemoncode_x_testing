import { renderHook } from "@testing-library/react-hooks";
import { useSearchBar } from "./search-bar.hook";

describe("common/components/search-bar/search-bar.hook specs", () => {
  it('should return search text, onSearch method and filteredList when it feeds colors array and "name" field', () => {
    // Arrange
    const colors = [
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

    // Act
    const { result } = renderHook(() => useSearchBar(colors, ['name']));

    // Assert
    expect(result.current.search).toEqual('');
    expect(result.current.onSearch).toEqual(expect.any(Function));
    expect(result.current.filteredList).toEqual(colors);
  });
});