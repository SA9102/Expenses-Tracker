import { useState } from "react";

import Entry from "./components/Entry";

import EntryType from "../types/entryType";
import { AddEntryType } from "../types/functionTypes";
import initialCategories from "./misc/initialCategories";

const App = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entryInput, setEntryInput] = useState<EntryType>({ name: "", price: 0, category: "Food" });
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false); // True if the user wants to create a new category
  const [newCategoryName, setNewCategoryName] = useState<string>(""); // Controlled input for the new category name
  const [currencies, setCurrencies] = useState<string[]>(["£", "$", "€", "¥", "₹"]);
  const [selectedCurrency, setSelectedCurrency] = useState("£");

  const handleAddEntry = () => {
    setEntries([...entries, entryInput]);
  };

  const handleAddCategory = () => {
    setCategories([...categories, newCategoryName]);
    setNewCategoryName("");
  };

  return (
    <>
      <h1>Expenses Tracker</h1>
      <div className="input-container">
        <label htmlFor="item">Item</label>
        <input type="text" name="item" id="item" value={entryInput.name} onChange={(e) => setEntryInput({ ...entryInput, name: e.target.value })} />
      </div>
      <div className="input-container">
        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" value={entryInput.price} onChange={(e) => setEntryInput({ ...entryInput, price: +e.target.value })} />
      </div>
      <div className="input-container">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" value={entryInput.category} onChange={(e) => setEntryInput({ ...entryInput, category: e.target.value })}>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isNewCategory ? (
        <div className="input-container">
          <label htmlFor="new-category">New Category</label>
          <input type="text" name="new-category" id="new-category" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
          <button onClick={handleAddCategory}>Add Category</button>
          <button onClick={() => setIsNewCategory(false)}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsNewCategory(true)}>New Category</button>
      )}

      <div className="input-container">
        <label htmlFor="currency">Currency</label>
        <select name="currency" id="currency" value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddEntry}>Add</button>
      {entries.map((entry) => (
        <Entry name={entry.name} price={entry.price} category={entry.category} currency={selectedCurrency} />
      ))}
    </>
  );
};

export default App;
