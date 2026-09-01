
import React from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  function handleSoldOut() {
    onUpdatePlant({
      ...plant,
      isSoldOut: true,
    });
  }

  function handleDelete() {
    onDeletePlant(plant.id);
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />

      <h4>{plant.name}</h4>

      <p>Price: {plant.price}</p>

      {plant.isSoldOut ? (
        <button>Out of Stock</button>
      ) : (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      )}

      <button onClick={handleDelete}>Donate</button>
    </li>
  );
}

export default PlantCard;

