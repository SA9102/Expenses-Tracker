import EntryType from "../../types/entryType";

const Entry = ({ name, price, category, currency }: EntryType) => {
  return (
    <div className="entry-container">
      <h2>{name}</h2>
      <h3>
        {currency}
        {price}
      </h3>
      <h4>{category}</h4>
    </div>
  );
};

export default Entry;
