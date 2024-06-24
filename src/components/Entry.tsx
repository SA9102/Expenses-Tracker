import EntryType from "../../types/entryType";

const Entry = ({ name, price, category }: EntryType) => {
  return (
    <div className="entry-container">
      <h2>{name}</h2>
      <h3>{price}</h3>
      <h4>{category}</h4>
    </div>
  );
};

export default Entry;
