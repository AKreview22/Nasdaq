import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import SearchBar from "./SearchBar";

jest.useFakeTimers();

afterEach(() => {
  jest.runAllTimers();
  jest.clearAllMocks();
  jest.clearAllTimers();
});

describe("SearchBar", () => {
  it("renders correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar setSearchQuery={jest.fn()} />
    );
    const input = getByPlaceholderText("Search for stocks");
    expect(input).toBeTruthy();
  });

  it("updates local query state on text input change", () => {
    const { getByPlaceholderText } = render(
      <SearchBar setSearchQuery={jest.fn()} />
    );
    const input = getByPlaceholderText("Search for stocks");

    fireEvent.changeText(input, "AAPL");
    expect(input.props.value).toBe("AAPL");
  });

  it("calls setSearchQuery and shows arrow on submit", async () => {
    const mockSetSearchQuery = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar setSearchQuery={mockSetSearchQuery} />
    );
    const input = getByPlaceholderText("Search for stocks");

    fireEvent.changeText(input, "AAPL");
    fireEvent(input, "submitEditing");

    expect(mockSetSearchQuery).toHaveBeenCalledWith("AAPL");

    await waitFor(() => {
      expect(getByTestId("arrow-back-button")).toBeTruthy();
    });
  });

  it("clears the query and hides arrow on clear button press", async () => {
    const mockSetSearchQuery = jest.fn();
    const { getByPlaceholderText, getByTestId } = render(
      <SearchBar setSearchQuery={mockSetSearchQuery} />
    );
    const input = getByPlaceholderText("Search for stocks");

    fireEvent.changeText(input, "AAPL");
    fireEvent(input, "submitEditing");

    const clearButton = await waitFor(() => getByTestId("arrow-back-button"));
    fireEvent.press(clearButton);

    expect(input.props.value).toBe("");
    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
    await waitFor(() => {
      expect(() => getByTestId("arrow-back-button")).toThrow();
    });
  });
});
