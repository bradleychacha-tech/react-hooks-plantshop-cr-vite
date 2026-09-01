
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function addPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((data) => {
        setPlants((currentPlants) => [...currentPlants, data]);
      });
  }

  function updatePlant(updatedPlant) {
    fetch(`http://localhost:6001/plants/${updatedPlant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isSoldOut: updatedPlant.isSoldOut,
      }),
    });

    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  }

  function deletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants((currentPlants) =>
        currentPlants.filter((plant) => plant.id !== id)
      );
    });
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearch={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        onUpdatePlant={updatePlant}
        onDeletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
