import { useState } from "react";

import Entry from "./components/Entry";

import EntryType from "../types/EntryType";
import { AddEntryType, DeleteEntryType } from "../types/functionTypes";
import initialCategories from "./misc/initialCategories";

import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entryInput, setEntryInput] = useState<EntryType>({
    id: uuidv4(),
    name: "",
    price: 0,
    category: "Food",
    currency: "£",
    isEditing: false,
  });
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false); // True if the user wants to create a new category
  const [newCategoryName, setNewCategoryName] = useState<string>(""); // Controlled input for the new category name
  const [currencies, setCurrencies] = useState<string[]>(["£", "$", "€", "¥", "₹"]);
  const [selectedCurrency, setSelectedCurrency] = useState("£");

  // When a new entry is created, it adds it to the list of 'entries', and also resets the inputs (but keeps 'selectedCurrency' the same).
  //
  const handleAddEntry: AddEntryType = () => {
    setEntries([...entries, entryInput]);
    setEntryInput({
      id: uuidv4(),
      name: "",
      price: 0,
      category: entryInput.category,
      currency: selectedCurrency,
      isEditing: false,
    });
  };

  // When a new category is created, it adds it to the list of 'categories', and resets the input
  const handleAddCategory = () => {
    setCategories([...categories, newCategoryName]);
    setNewCategoryName("");
  };

  // Deletes an entry based on its id
  //
  const handleDeleteEntry: DeleteEntryType = (id) => {
    setEntries(entries.filter((entry: EntryType) => entry.id !== id));
  };

  // Called when a user updates the entries of an existing entry.
  const handleUpdateEntry = (id: string, property, value) => {
    setEntries(
      entries.map((entry: EntryType) => {
        if (entry.id === id) {
          // if (property === "name") {
          //   entry.name = value;
          // }
          entry[property] = value;
        }
        return entry;
      })
    );
  };

  const handleToggleEditEntry = (id: string) => {
    setEntries(
      entries.map((entry: EntryType) => {
        if (entry.id === id) {
          entry.isEditing = !entry.isEditing;
        }
        return entry;
      })
    );
  };

  const getEntryById = (id: string) => {
    return entries.find((entry: EntryType) => entry.id === id);
  };

  const getExistingEntryValue = (id: string, property: string) => {
    const entry = getEntryById(id);
    console.log("ENTRY.NAME");
    console.log(entry.name);
    return entry.name;
  };

  return (
    <>
      <h1>Expenses Tracker</h1>
      <div className="input-container">
        <label htmlFor="item">Item</label>
        <input
          type="text"
          name="item"
          id="item"
          value={entryInput.name}
          onChange={(e) => setEntryInput({ ...entryInput, name: e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          value={entryInput.price}
          onChange={(e) => setEntryInput({ ...entryInput, price: +e.target.value })}
        />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={entryInput.category}
          onChange={(e) => setEntryInput({ ...entryInput, category: e.target.value })}
        >
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isNewCategory ? (
        <div className="input-container">
          <label htmlFor="new-category">New Category</label>
          <input
            type="text"
            name="new-category"
            id="new-category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
          <button onClick={() => setIsNewCategory(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsNewCategory(true)}>New Category</button>
      )}

      <div className="input-container">
        <label htmlFor="currency">Currency</label>
        <select
          name="currency"
          id="currency"
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddEntry}>Add</button>

      {/* Rendering the entries */}

      {entries.map((entry) =>
        entry.isEditing ? (
          <div>
            <div className="input-container">
              <label htmlFor="item">Item</label>
              <input
                type="text"
                name="item"
                id="item"
                value={entry.name}
                onChange={(e) => handleUpdateEntry(entry.id, "name", e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={entry.price}
                onChange={(e) => handleUpdateEntry(entry.id, "price", e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={entry.category}
                onChange={(e) => handleUpdateEntry(entry.id, "category", e.target.value)}
              >
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button onClick={() => handleToggleEditEntry(entry.id)}>Save</button>
          </div>
        ) : (
          <>
            <Entry
              key={entry.id}
              name={entry.name}
              price={entry.price}
              category={entry.category}
              currency={selectedCurrency}
            />
            <button onClick={() => handleToggleEditEntry(entry.id)}>Edit</button>
            <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
          </>
        )
      )}
    </>
  );
};

export default App;
