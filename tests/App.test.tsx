import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, test } from "vitest";

import App from "../src/App";
import EntryType from "../types/entryType";

const getCategoryCombobox = () => {
  return screen.getByRole("combobox", { name: /category/i });
};

const getNewCategoryComponents = () => {
  const categoryTBox = screen.queryByRole("textbox", { name: /new category/i });
  const categoryConfirmBtn = screen.queryByRole("button", { name: /add category/i });
  const categoryCancelBtn = screen.queryByRole("button", { name: /cancel/i });

  return { categoryTBox, categoryConfirmBtn, categoryCancelBtn };
};

const getNewCategoryButton = () => {
  return screen.getByRole("button", { name: /new category/i });
};

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

  it("should display a combobox to select the category of the item", () => {
    render(<App />);
    const categoryInput = screen.getByRole("combobox", { name: "Category" });
    expect(categoryInput).toBeInTheDocument();
  });

  it("should display a combobox to select the currency", () => {
    render(<App />);
    const currencyInput = screen.getByRole("combobox", { name: "Currency" });
    expect(currencyInput).toBeInTheDocument();
  });

  it("should display a 'New Category' button to allow the user to create a new category", () => {
    render(<App />);
    const newCategoryButton = screen.getByRole("button", { name: /new category/i });
    expect(newCategoryButton).toBeInTheDocument();
  });

  test("when 'New Category' is clicked, it should show an input field where the user can enter the name of the new category, and a button to confirm", async () => {
    const user = userEvent.setup();
    render(<App />);

    let newCategoryButton = getNewCategoryButton();

    await user.click(newCategoryButton);

    const { categoryTBox, categoryConfirmBtn, categoryCancelBtn } = getNewCategoryComponents();

    expect(categoryTBox).toBeInTheDocument();
    expect(categoryConfirmBtn).toBeInTheDocument();
    expect(categoryCancelBtn).toBeInTheDocument();
    // expect(newCategoryButton).not.toBeInTheDocument();
  });

  test("when creating a new category, it should now appear in the 'Category' combobox", async () => {
    const user = userEvent.setup();
    render(<App />);

    const testOption = "foo";
    // const newCategoryButton = screen.getByRole()
    const categoryCombobox = getCategoryCombobox();

    // There should initially be no option called 'foo' in the Category combobox.
    let option = screen.queryByRole("option", { name: testOption });

    expect(option).not.toBeInTheDocument();

    // Creating a category called 'foo'

    const newCategoryButton = getNewCategoryButton();

    await user.click(newCategoryButton);

    const { categoryTBox, categoryConfirmBtn, categoryCancelBtn } = getNewCategoryComponents();

    await user.type(categoryTBox, "foo");
    await user.click(categoryConfirmBtn);

    // Checking if the category 'foo' is now an option

    option = screen.getByRole("option", { name: testOption });
    expect(option).toBeInTheDocument();
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

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    nameHeading = screen.getByRole("heading", { name: testProps.name });
    priceHeading = screen.getByRole("heading", { name: "" + testProps.price });
    expect(nameHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();
  });
});
