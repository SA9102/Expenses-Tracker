import { useMemo, useState } from "react";

import Entry from "./components/Entry";

import EntryType from "../types/EntryType";
import { AddEntryType, DeleteEntryType } from "../types/functionTypes";
import initialCategories from "./misc/initialCategories";

import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [entries, setEntries] = useState<EntryType[]>([]);
  const [entryInput, setEntryInput] = useState<EntryType>({
    id: uuidv4(),
    item: "",
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
  const [sortBy, setSortBy] = useState<"item" | "price" | "category">("item");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [itemFilter, setItemFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("0");
  // When filtering the entries by price, users can choose to show entries less than, greater than, or equal to a particular value.
  const [priceComparison, setPriceComparison] = useState<"equal-to" | "less-than" | "greater-than" | "range">("equal-to");
  const [priceFilterMin, setPriceFilterMin] = useState("0"); // The minimum value when filtering entries by price range
  const [priceFilterMax, setPriceFilterMax] = useState("0"); // The maximum value when filtering entries by price range

  // We only want the items to be filtered if 'entries', 'itemFilter' and/or 'priceFilter' change, so that the filtering doesn't occur on
  // every single render (which could potentially slow the application down). Hence we use useMemo here.
  //
  let entriesDisplay: EntryType[] = useMemo(() => {
    let a = [...entries];
    if (itemFilter.trim() !== "") {
      a = a.filter((entry: EntryType) => entry.item.includes(itemFilter.trim().toLowerCase()));
    }
    if (priceComparison !== "range" && +priceFilter > 0) {
      a = a.filter((entry: EntryType) => {
        if (priceComparison === "equal-to") {
          return entry.price === +priceFilter;
        } else if (priceComparison === "less-than") {
          return entry.price <= +priceFilter;
        } else if (priceComparison === "greater-than") {
          return entry.price >= +priceFilter;
        }
      });
    } else if (priceComparison === "range") {
      a = a.filter((entry: EntryType) => entry.price >= +priceFilterMin && entry.price <= +priceFilterMax);
    }
    return a;
  }, [entries, itemFilter, priceFilter, priceComparison, priceFilterMin, priceFilterMax]);

  // entriesDisplay = useMemo(() => {
  //   if (+priceFilter > 0) {
  //     return [...entriesDisplay].filter((entry: EntryType) => {
  //       if (priceComparison === "equal-to") {
  //         return entry.price === +priceFilter;
  //       } else if (priceComparison === "less-than") {
  //         return entry.price <= +priceFilter;
  //       } else if (priceComparison === "greater-than") {
  //         return entry.price >= +priceFilter;
  //       }
  //     });
  //   }
  //   return [...entries];
  // }, [entries, priceFilter]);

  // When a new entry is created, it adds it to the list of 'entries', and also resets the inputs (but keeps 'selectedCurrency' the same).
  //
  const handleAddEntry: AddEntryType = () => {
    setEntries([...entries, entryInput]);
    setEntryInput({
      id: uuidv4(),
      item: "",
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
  const handleUpdateEntry = (id: string, property: string, value) => {
    setEntries(
      entries.map((entry: EntryType) => {
        if (entry.id === id) {
          entry[property] = value;
        }
        return entry;
      })
    );
  };

  // Find an entry from the 'entries' array by id, and toggle its 'isEditing' property
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

  // Resets all filters so that all entries show
  const handleClearAllFilters = () => {
    setItemFilter("");
    setPriceFilter("");
    setPriceComparison("equal-to");
    setPriceFilterMin("0");
    setPriceFilterMax("0");
  };

  // Get an entry from the 'entries' array according to the given id
  // const getEntryById = (id: string) => {
  //   return entries.find((entry: EntryType) => entry.id === id);
  // };

  // const handleChangeSortBy = (sortBy: "item" | "price" | "category") => {
  //   setSortBy(sortBy);
  //   let newlySortedEntries = [...entries];
  //   newlySortedEntries.sort((a, b) => {
  //     if (order === "asc") {
  //       if (a[sortBy] < b[sortBy]) {
  //         return -1;
  //       }
  //       if (a[sortBy] > b[sortBy]) {
  //         return 1;
  //       }
  //       return 0;
  //     } else {
  //       if (a[sortBy] > b[sortBy]) {
  //         return -1;
  //       }
  //       if (a[sortBy] < b[sortBy]) {
  //         return 1;
  //       }
  //       return 0;
  //     }
  //   });
  //   setEntries(newlySortedEntries);
  // };

  // const handleChangeOrder = (order: "asc" | "desc") => {
  //   setOrder(order);
  // };

  return (
    <>
      <h1>Expenses Tracker</h1>
      <div className="input-container">
        <label htmlFor="item">Item</label>
        <input type="text" name="item" id="item" value={entryInput.item} onChange={(e) => setEntryInput({ ...entryInput, item: e.target.value })} />
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

      {/* <div className="sort-section">
        <p>'Item' and 'Category' will be sorted alphabetically</p>
        <div className="input-container">
          <label htmlFor="sort-by">Sort By</label>
          <select
            name="sort-by"
            id="sort-by"
            value={sortBy}
            onChange={(e) => handleChangeSortBy(e.target.value)}
          >
            <option value="item">Item</option>
            <option value="price">Price</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="order">Order</label>
          <select
            name="order"
            id="order"
            value={order}
            onChange={(e) => handleChangeOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div> */}

      {/* FILTER ITEMS */}
      <div className="filter-section">
        <h2>Filters</h2>
        {/* Filtering by item name */}
        <div className="input-container">
          <label htmlFor="item-filter">Filter by item</label>
          <input type="text" name="item-filter" id="item-filter" value={itemFilter} onChange={(e) => setItemFilter(e.target.value)} />
        </div>

        {/* Filtering by price. Users can specify whether to show entries whose price is less than, greater than, or equal to this value.
        They can also specify a price range. */}
        <div className="input-container">
          <label htmlFor="price-filter">Filter by price</label>
          <p>
            <i>Value of 0 for non-range will show all prices</i>
          </p>
          <input
            type="radio"
            id="less-than"
            name="price"
            value="less-than"
            checked={priceComparison === "less-than"}
            onChange={(e) => setPriceComparison(e.target.value)}
          />
          <label htmlFor="less-than">Less than (inclusive)</label>
          <input
            type="radio"
            id="greater-than"
            name="price"
            value="greater-than"
            checked={priceComparison === "greater-than"}
            onChange={(e) => setPriceComparison(e.target.value)}
          />
          <label htmlFor="greater-than">Greater than (inclusive)</label>
          <input
            type="radio"
            id="equal-to"
            name="price"
            value="equal-to"
            checked={priceComparison === "equal-to"}
            onChange={(e) => setPriceComparison(e.target.value)}
          />
          <label htmlFor="equal-to">Equal to</label>

          <input
            type="number"
            name="price-filter"
            id="price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            disabled={priceComparison === "range"}
          />
          <input
            type="radio"
            id="range"
            name="price"
            value="range"
            checked={priceComparison === "range"}
            onChange={(e) => setPriceComparison(e.target.value)}
          />
          <label htmlFor="range">Range (inclusive)</label>
          <label htmlFor="min">Min</label>
          <input
            type="number"
            name="price-min"
            id="price-min"
            value={priceFilterMin}
            onChange={(e) => setPriceFilterMin(e.target.value)}
            disabled={priceComparison !== "range"}
          />
          <input
            type="number"
            name="price-max"
            id="price-max"
            value={priceFilterMax}
            onChange={(e) => setPriceFilterMax(e.target.value)}
            disabled={priceComparison !== "range"}
          />
        </div>
        <button onClick={handleClearAllFilters}>Clear all filters</button>
      </div>

      {/* Rendering the entries */}

      {entriesDisplay.map((entry) =>
        entry.isEditing ? (
          <div>
            <div className="input-container">
              <label htmlFor="item">Item</label>
              <input type="text" name="item" id="item" value={entry.item} onChange={(e) => handleUpdateEntry(entry.id, "name", e.target.value)} />
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
              <select name="category" id="category" value={entry.category} onChange={(e) => handleUpdateEntry(entry.id, "category", e.target.value)}>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button onClick={() => handleToggleEditEntry(entry.id)}>Save</button>
          </div>
        ) : (
          <>
            <Entry key={entry.id} item={entry.item} price={entry.price} category={entry.category} currency={selectedCurrency} />
            <button onClick={() => handleToggleEditEntry(entry.id)}>Edit</button>
            <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
          </>
        )
      )}
    </>
  );
};

export default App;
