type Props = {
  name: string;
  price: number;
  category: string;
  currency: string;
};

const Entry = ({ name, price, category, currency }: Props) => {
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
