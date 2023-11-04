import { useState } from "react";
import "./App.css";

const products = ["Select:", "Bread", "Pasta", "Milk", "Sugar", "Cheese"];

export default function App() {
  const [prod, setProd] = useState([]);
  const [price, setPrice] = useState("");
  const [limit, setLimit] = useState("");

  function handleAddItem(item) {
    setProd((prod) => [...prod, item]);
    setPrice();
  }

  function handleDeleteItem(item) {
    setProd([]);
    setLimit("");
  }

  function calculateTotal(prod) {
    let total = 0;
    prod.forEach((item) => {
      total += item.price * item.item;
    });
    return total;
  }

  return (
    <div className="app">
      <Menu />
      <AddNumberOfItem
        onAddItem={handleAddItem}
        price={price}
        setPrice={setPrice}
        limit={limit}
        onSetLimit={setLimit}
      />
      <List prod={prod} />
      <Output total={calculateTotal(prod)} limit={limit} />
      {/* <Output /> */}
      <Button2 onDeleteItem={handleDeleteItem}>Reset</Button2>
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Button2({ children, onClick, onDeleteItem }) {
  return (
    <button className="button" onClick={onDeleteItem}>
      {children}
    </button>
  );
}

function Menu() {
  return (
    <div className="a">
      <h2>Shopping List</h2>
      <h3>What is your choice?</h3>
    </div>
  );
}

function AddNumberOfItem({ onAddItem, price, setPrice, limit, onSetLimit }) {
  const [item, setItem] = useState("0");
  const [type, setType] = useState("kg");
  const [product, setProduct] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!product) return;
    const newItem = {
      id: Date.now(),
      product,
      item,
      type,
      price,
      packed: false,
    };

    // console.log(newItem);

    onAddItem(newItem);

    setItem("");
    setType("kg");
    setProduct("");
    setPrice("");
  }
  return (
    <div className="a">
      <form onSubmit={handleSubmit}>
        <label>Limit </label>
        <input
          type="number"
          value={limit}
          onChange={(e) => onSetLimit(e.target.value)}
        ></input>
        <label>€</label>
      </form>
      <form onSubmit={handleSubmit}>
        <label>Nr. of items </label>
        <select value={item} onChange={(e) => setItem(Number(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => i).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <label> Kg/Piece </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="kg">Kg</option>
          <option value="liter">Liter</option>
          <option value="piece">Piece</option>
        </select>
      </form>
      <form onSubmit={handleSubmit}>
        <label>Product </label>
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          {products.map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        ></input>
      </form>
      <form onSubmit={handleSubmit}>
        <label>Price </label>
        <select value={price} onChange={(e) => setPrice(e.target.value)}>
          {Array.from({ length: 21 }, (_, i) => i).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <label>€</label>
        <div>
          <Button>Add to list</Button>
        </div>
      </form>
    </div>
  );
}

function List({ prod }) {
  return (
    <ul className="b">
      {prod.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <ul>
      <li>
        <span>
          {item.item} {item.type} {item.product} {item.price * item.item}€
        </span>
      </li>
    </ul>
  );
}

function Output({ total, limit }) {
  return (
    <h3
      className="a"
      style={{ backgroundColor: total > limit ? "rgba(202, 0, 0, 0.911)" : "" }}
    >
      Total: {total} €
    </h3>
  );
}
