import { useState } from "react";

const App = () => {
  const [categories, setCategories] = useState(["Food", "Clothing", "Personal Care", "Entertainment", "Electricals and Gadgets", "Travel"]);
  const [newCategoryName, setNewCategoryName] = useState("")


  const handleAddCategory = () => {
    setCategories([...categories, newCategoryName]);
    setNewCategoryName("");
  };

  return (
    <>
      <div>
        <label htmlFor="category">Category</label>
        <select name="category" id="category">
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="add-category">Add Category</label>
        <input type="text" name="add-category" id="add-category" />
        <button onClick={handleAddCategory}>Add</button>
      </div>

    </>
  );
};

export default App;
