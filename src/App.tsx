import { useState } from "react";

import Entry from "./components/Entry";

import EntryType from "../types/entryType";
import { AddEntryType } from "../types/functionTypes";

const App = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entryInput, setEntryInput] = useState<EntryType>({ name: "", price: 0, category: "$" });

  const handleAddEntry: AddEntryType = () => {
    setEntries([...entries, entryInput]);
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
        <label htmlFor="currency">Currency</label>
        <select name="currency" id="currency">
          <option value="$">$</option>
          <option value="£">£</option>
          <option value="€">€</option>
          <option value="¥">¥</option>
          <option value="₹">₹</option>
        </select>
      </div>
      <button onClick={handleAddEntry}>Add</button>
      {entries.map((entry) => (
        <Entry name={entry.name} price={entry.price} category={entry.category} />
      ))}
    </>
  );
};

export default App;
