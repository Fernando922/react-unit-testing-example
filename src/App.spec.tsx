import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  it("Should render list items", () => {
    const { getByText } = render(<App />);

    expect(getByText("Fernando")).toBeInTheDocument();
    expect(getByText("Rodrigo")).toBeInTheDocument();
    expect(getByText("Thiago")).toBeInTheDocument();
  });

  it("Should be able to add new item to the list", async () => {
    const { getByText, findByText, getByPlaceholderText } = render(<App />);

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    userEvent.type(inputElement, "Novo");
    userEvent.click(addButton);

    expect(await findByText("Novo")).toBeInTheDocument();
  });

  it("Should be able to remove item from the list", async () => {
    const { getAllByText, queryByText } = render(<App />);

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Fernando")).not.toBeInTheDocument();
    });
  });
});
