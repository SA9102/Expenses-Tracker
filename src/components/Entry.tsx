type Props = {
  item: string;
  price: number;
  category: string;
  currency: string;
};

const Entry = ({ item, price, category, currency }: Props) => {
  return (
    <div className="entry-container">
      <h2>{item}</h2>
      <h3>
        {currency}
        {price}
      </h3>
      <h4>{category}</h4>
    </div>
  );
};

export default Entry;
