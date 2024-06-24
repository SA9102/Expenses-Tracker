import React from "react";
import { render, screen } from "@testing-library/react";
import Entry from "../src/components/Entry";
import { describe, expect, it, test } from "vitest";
import EntryType from "../types/entryType";

describe("Entry.tsx", () => {
  it("should have headings that mention the item, price, and category", () => {
    const testProps: EntryType = { name: "foo", price: 20, category: "bar" };
    render(<Entry name={testProps.name} price={testProps.price} category={testProps.category} />);
    const nameHeading = screen.getByRole("heading", { name: testProps.name });
    const priceHeading = screen.getByRole("heading", { name: "" + testProps.price });
    const categoryHeading = screen.getByRole("heading", { name: testProps.category });
    expect(nameHeading).toBeInTheDocument();
    expect(priceHeading).toBeInTheDocument();
    expect(categoryHeading).toBeInTheDocument();
  });
});
