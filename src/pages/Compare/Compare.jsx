import "./Compare.css";

const compareProducts = [
  {
    id: 1,
    title: "Sports Shoes",
    price: 2499,
    rating: 4.5,
    category: "Shoes",
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 3999,
    rating: 4.8,
    category: "Electronics",
  },
];

function Compare() {
  return (
    <div className="compare-page">
      <h1>⚖️ Product Comparison</h1>

      <table className="compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>{compareProducts[0].title}</th>
            <th>{compareProducts[1].title}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Price</td>
            <td>₹{compareProducts[0].price}</td>
            <td>₹{compareProducts[1].price}</td>
          </tr>

          <tr>
            <td>Rating</td>
            <td>⭐ {compareProducts[0].rating}</td>
            <td>⭐ {compareProducts[1].rating}</td>
          </tr>

          <tr>
            <td>Category</td>
            <td>{compareProducts[0].category}</td>
            <td>{compareProducts[1].category}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Compare;