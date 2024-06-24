import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, test } from "vitest";

import App from "../src/App";
import EntryType from "../types/entryType";

describe("App.tsx", () => {
  it("should display a header saying 'Expenses Tracker'", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: "Expenses Tracker" });
    expect(heading).toBeInTheDocument();
  });

  it("should display an input field to enter the item that was bought", () => {
    render(<App />);
    const productInput = screen.getByRole("textbox", { name: "Item" });
    expect(productInput).toBeInTheDocument();
  });

  it("should display an input field to enter the price of the item", () => {
    render(<App />);
    const priceInput = screen.getByRole("spinbutton", { name: "Price" });
    expect(priceInput).toBeInTheDocument();
  });

  it("should display a combobox to select the currency", () => {
    render(<App />);
    const currencyInput = screen.getByRole("combobox", { name: "Currency" });
    expect(currencyInput).toBeInTheDocument();
  });

  test("when 'Add' is clicked, it should add an entry which shows the details of the item", async () => {
    const user = userEvent.setup();
    render(<App />);
    const testProps: EntryType = { name: "foo", price: 20, category: "bar" };

    let nameHeading = screen.queryByRole("heading", { name: testProps.name });
    let priceHeading = screen.queryByRole("heading", { name: "" + testProps.price });
    // let categoryHeading = screen.queryByRole("heading", { name: testProps.category });

    expect(nameHeading).not.toBeInTheDocument();
    expect(priceHeading).not.toBeInTheDocument();
    // expect(categoryHeading).not.toBeInTheDocument();

    const nameInput = screen.getByRole("textbox", { name: "Item" });
    const priceInput = screen.getByRole("spinbutton", { name: "Price" });
    // const productInput = screen.getByRole("textbox", { name: "Item" });
    await user.type(nameInput, testProps.name);
    await user.type(priceInput, "" + testProps.price);

    const addButton = screen.getByRole("button", { name: "Add" });
    await user.click(addButton);

    nameHeading = screen.getByRole("heading", { name: testProps.name });
    priceHeading = screen.getByRole("heading", { name: "" + testProps.price });
    expect(nameHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();
  });
});
