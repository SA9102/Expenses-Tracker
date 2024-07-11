type Props = {
  item: string;
  price: number;
  category: string;
  currency: string;
};

const Entry = ({ item, price, category, currency, purchaseDate }) => {
  // Adds a 0 to the end if there is only one value after the decimal point
  const formatPrice = () => {
    let formattedPrice: string | string[] = "" + price;

    if (formattedPrice.includes(".")) {
      formattedPrice = formattedPrice.split(".");
      if (formattedPrice[1].length === 1) {
        formattedPrice[1] = formattedPrice[1] + "0";
      }
      formattedPrice = formattedPrice.join(".");
    }

    return formattedPrice;
  };

  const formattedPrice = formatPrice();

  return (
    <div className="entry-container">
      <h2>{item}</h2>
      <h3>
        {currency}
        {formattedPrice}
      </h3>
      <h4>{category}</h4>
      <h5>{purchaseDate}</h5>
    </div>
  );
};

export default Entry;
