import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchBarComponent } from "./search-bar.component";

describe("common/search-bar/search-bar.component specs", () => {
  it("should render an input with placeholder and searchIcon when it feeds required props", () => {
    // Arrange
    const props = {
      search: 'test search',
      onSearch: jest.fn(),
      labels: {
        placeholder: 'test placeholder',
      },
    };

    // Act
    render(<SearchBarComponent {...props} />);

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    // Assert
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toEqual('test search');
  });
});