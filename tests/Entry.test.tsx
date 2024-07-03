import React from "react";
import { render, screen } from "@testing-library/react";
import Entry from "../src/components/Entry";
import { describe, expect, it, test } from "vitest";
import EntryType from "../types/EntryType";
import userEvent from "@testing-library/user-event";

const addEntry = (testProps) => {
  render(
    <Entry
      name={testProps.name}
      price={testProps.price}
      category={testProps.category}
      currency={testProps.currency}
    />
  );
  const nameHeading = screen.getByRole("heading", { name: testProps.name });
  const priceHeading = screen.getByRole("heading", { name: "£" + testProps.price });
  const categoryHeading = screen.getByRole("heading", { name: testProps.category });

  return { nameHeading, priceHeading, categoryHeading };
};

// TODO
describe("Entry.tsx", () => {
  const testProps: EntryType = {
    id: "1",
    name: "foo",
    price: 20,
    category: "bar",
    currency: "£",
    isEditing: false,
  };
  it("should have headings that mention the item, price, and category", () => {
    const { nameHeading, priceHeading, categoryHeading } = addEntry(testProps);
    expect(nameHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();
    expect(categoryHeading).toBeInTheDocument();
  });

  // test("should be able to edit an entry", () => {
  //   const testProps: EntryType = { name: "foo", price: 20, category: "bar", currency: "£" };
  //   render(<Entry name={testProps.name} price={testProps.price} category={testProps.category} currency={testProps.currency} />);
  //   const nameHeading = screen.getByRole("heading", { name: testProps.name });
  //   const priceHeading = screen.getByRole("heading", { name: "" + testProps.price });
  //   const categoryHeading = screen.getByRole("heading", { name: testProps.category });
  //   expect(nameHeading).toBeInTheDocument();
  //   expect(priceHeading).toBeInTheDocument();
  //   expect(categoryHeading).toBeInTheDocument();
  // })

  // test("should be able to delete an entry", async () => {
  //   const { deleteBtn } = addEntry(testProps);
  //   const user = userEvent.setup();
  //   await user.click(deleteBtn);
  //   const nameHeading = screen.queryByRole("heading", { name: testProps.name });
  //   const priceHeading = screen.queryByRole("heading", { name: "£" + testProps.price });
  //   const categoryHeading = screen.queryByRole("heading", { name: testProps.category });
  //   const editBtn = screen.queryByRole("button", { name: "Edit" });
  //   const deleteBtn2 = screen.queryByRole("button", { name: "Delete" });

  //   expect(nameHeading).not.toBeInTheDocument();
  //   expect(priceHeading).not.toBeInTheDocument();
  //   expect(categoryHeading).not.toBeInTheDocument();
  //   expect(editBtn).not.toBeInTheDocument();
  //   expect(deleteBtn).not.toBeInTheDocument();
  // });
});
