import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, test, vi } from "vitest";

import App from "../src/App";
import EntryType from "../types/entryType";

const getCategoryCombobox = () => {
  return screen.getByRole("combobox", { name: /category/i });
};

const getNewCategoryComponents = () => {
  const categoryTBox = screen.getByRole("textbox", { name: /new category/i });
  const categoryConfirmBtn = screen.getByRole("button", { name: /add category/i });
  const categoryCancelBtn = screen.getByRole("button", { name: /cancel/i });

  return { categoryTBox, categoryConfirmBtn, categoryCancelBtn };
};

const getNewCategoryButton = () => {
  return screen.getByRole("button", { name: /new category/i });
};

const addEntry = async (item: string, price: string) => {
  const user = userEvent.setup();
  const itemInput = screen.getByRole("textbox", { name: /item/i });
  const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  const addEntryBtn = screen.getByRole("button", { name: /add/i });

  await user.type(itemInput, item);
  await user.type(priceInput, price);
  await user.click(addEntryBtn);
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

  test("if 'New Category' is clicked, it should show an input field where the user can enter the name of the new category, and a button to confirm", async () => {
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

    // There should initially be no option called 'foo' in the Category combobox.
    let option = screen.queryByRole("option", { name: testOption });

    expect(option).not.toBeInTheDocument();

    // Creating a category called 'foo'

    const newCategoryButton = getNewCategoryButton();

    await user.click(newCategoryButton);

    const { categoryTBox, categoryConfirmBtn, categoryCancelBtn } = getNewCategoryComponents();

    await user.type(categoryTBox, "foo");
    await user.click(categoryConfirmBtn);

    option = screen.getByRole("option", { name: testOption });
    expect(option).toBeInTheDocument();
  });

  // TODO
  test("if 'Cancel' is pressed when creating a new category, it should no longer show the input for creating a category, and nothing should be added to the list of categories", async () => {
    const user = userEvent.setup();
    render(<App />);
    const newCategoryButton = getNewCategoryButton();

    await user.click(newCategoryButton);

    let { categoryTBox, categoryConfirmBtn, categoryCancelBtn } = getNewCategoryComponents();

    const testOption = "foo";

    await user.type(categoryTBox, testOption);
    await user.click(categoryCancelBtn);

    const testCategoryTBox = screen.queryByRole("textbox", { name: /new category/i });
    const testCategoryConfirmBtn = screen.queryByRole("button", { name: /add category/i });
    const testCategoryCancelBtn = screen.queryByRole("button", { name: /cancel/i });

    const option = screen.queryByRole("option", { name: testOption });

    expect(option).not.toBeInTheDocument();
    expect(testCategoryTBox).not.toBeInTheDocument();
    expect(testCategoryConfirmBtn).not.toBeInTheDocument();
    expect(testCategoryCancelBtn).not.toBeInTheDocument();
  });

  test("when 'Add' is clicked, it should add an entry which shows the details of the item", async () => {
    const user = userEvent.setup();
    render(<App />);
    const testProps: EntryType = { name: "foo", price: 20, category: "bar", currency: "£" };

    let nameHeading = screen.queryByRole("heading", { name: testProps.name });
    let priceHeading = screen.queryByRole("heading", { name: "£" + testProps.price });
    // let categoryHeading = screen.queryByRole("heading", { name: testProps.category });

    expect(nameHeading).not.toBeInTheDocument();
    expect(priceHeading).not.toBeInTheDocument();
    // expect(categoryHeading).not.toBeInTheDocument();

    const nameInput = screen.getByRole("textbox", { name: "Item" });
    const priceInput = screen.getByRole("spinbutton", { name: "Price" });
    // const productInput = screen.getByRole("textbox", { name: "Item" });
    await user.type(nameInput, testProps.name);
    await user.type(priceInput, "£" + testProps.price);

    const addButton = screen.getByRole("button", { name: /add/i });
    await user.click(addButton);

    nameHeading = screen.getByRole("heading", { name: testProps.name });
    priceHeading = screen.getByRole("heading", { name: "£" + testProps.price });
    expect(nameHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();
  });

  test("inital currency should be in pounds (£)", () => {
    render(<App />);
    const initialCurrency = "£";
    const currencyCBox = screen.getByRole("combobox", { name: /currency/i });
    expect(currencyCBox.value).toBe(initialCurrency);
  });

  it("should render the correct currency when an entry is added", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Selecting a currency
    // await user.selectOptions(screen.getByRole("combobox", { name: /currency/i }), ["$"]);

    await addEntry();
    let priceText = screen.getByRole("heading", { name: "£20" });
    expect(priceText).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox", { name: /currency/i }), ["$"]);

    priceText = screen.getByRole("heading", { name: "$20" });
    expect(priceText).toBeInTheDocument();
  });

  // test("item name cannot be empty", async () => {
  //   const user = userEvent.setup();
  //   render(<App />);

  //   const priceInput = screen.getByRole("spinbutton", { name: /price/i });
  //   await user.type(priceInput, "20");

  //   const addBtn = screen.getByRole("button", { name: "Add" });

  //   const priceHeading = screen.queryByRole("heading", { name: "£20" });

  //   expect(priceHeading).toBeInTheDocument();
  // });

  test("should be able to delete an entry", async () => {
    render(<App />);

    const testItem = "foo";
    const testPrice = "20";

    // const user = userEvent.setup();

    // addEntry(testItem, testPrice);

    const user = userEvent.setup();
    const itemInput = screen.getByRole("textbox", { name: /item/i });
    const priceInput = screen.getByRole("spinbutton", { name: /price/i });
    const addEntryBtn = screen.getByRole("button", { name: /add/i });

    await user.type(itemInput, testItem);
    await user.type(priceInput, testPrice);
    await user.click(addEntryBtn);

    let itemHeading = screen.getByRole("heading", { name: testItem });
    let priceHeading = screen.getByRole("heading", { name: "£" + testPrice });

    expect(itemHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();

    // const deleteBtn = screen.getByRole("button", {name: /delete/i})
    // await user.click(deleteBtn)
  });
});
