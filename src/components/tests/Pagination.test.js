import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TablePaginationActions from "../Pagination";

describe("TablePaginationActions Component", () => {
  const mockOnPageChange = jest.fn();
  const mockOnRowsPerPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
    mockOnRowsPerPageChange.mockClear();
  });

  test("renders pagination controls correctly", () => {
    render(
      <TablePaginationActions
        count={100}
        page={0}
        rowsPerPage={10}
        onPageChange={mockOnPageChange}
        onRowsPerPageChange={mockOnRowsPerPageChange}
      />
    );

    expect(
      screen.getByRole("button", { name: /first page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /last page/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  test("calls onPageChange with correct arguments", () => {
    render(
      <TablePaginationActions
        count={100}
        page={0}
        rowsPerPage={10}
        onPageChange={mockOnPageChange}
        onRowsPerPageChange={mockOnRowsPerPageChange}
      />
    );

    fireEvent.click(screen.getByLabelText(/next page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 1);

    fireEvent.click(screen.getByLabelText(/last page/i));
    expect(mockOnPageChange).toHaveBeenCalledWith(expect.anything(), 9);
  });

  test("disables buttons when on the first page", () => {
    render(
      <TablePaginationActions
        count={100}
        page={0}
        rowsPerPage={10}
        onPageChange={mockOnPageChange}
        onRowsPerPageChange={mockOnRowsPerPageChange}
      />
    );

    expect(screen.getByLabelText(/first page/i)).toBeDisabled();
    expect(screen.getByLabelText(/previous page/i)).toBeDisabled();
  });

  test("disables buttons when on the last page", () => {
    render(
      <TablePaginationActions
        count={100}
        page={9}
        rowsPerPage={10}
        onPageChange={mockOnPageChange}
        onRowsPerPageChange={mockOnRowsPerPageChange}
      />
    );

    expect(screen.getByLabelText(/last page/i)).toBeDisabled();
    expect(screen.getByLabelText(/next page/i)).toBeDisabled();
  });
});
