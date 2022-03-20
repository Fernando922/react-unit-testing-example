import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import List from "./List";

describe("App Component", () => {
  it("Should render list items", async () => {
    const { getByText, rerender, queryByText, unmount } = render(
      <List initialItems={["Fernando", "Rodrigo", "Thiago"]} />
    );

    expect(getByText("Fernando")).toBeInTheDocument();
    expect(getByText("Rodrigo")).toBeInTheDocument();
    expect(getByText("Thiago")).toBeInTheDocument();

    unmount();
    rerender(<List initialItems={["Julia"]} />);

    expect(getByText("Julia")).toBeInTheDocument();
    expect(queryByText("Thiago")).not.toBeInTheDocument();
  });

  it("Should be able to add new item to the list", async () => {
    const { getByText, findByText, getByPlaceholderText } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText("Novo item");
    const addButton = getByText("Adicionar");

    userEvent.type(inputElement, "Novo");
    userEvent.click(addButton);

    expect(await findByText("Novo")).toBeInTheDocument();
  });

  it("Should be able to remove item from the list", async () => {
    const { getAllByText, queryByText } = render(
      <List initialItems={["Fernando", "Rodrigo", "Thiago"]} />
    );

    const removeButtons = getAllByText("Remover");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(queryByText("Fernando")).not.toBeInTheDocument();
    });
  });
});
