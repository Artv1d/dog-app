import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const BreedList = () => {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setSelectedBreed, selectedBreed } = useAppContext();

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((res) => res.json())
      .then((data) => {
        const breedList = [];

        Object.entries(data.message).forEach(([breed, subBreeds]) => {
          if (subBreeds.length === 0) {
            breedList.push(breed);
          } else {
            subBreeds.forEach((sub) => {
              breedList.push(`${breed}/${sub}`);
            });
          }
        });

        setBreeds(breedList);
      })
      .catch((err) => {
        console.error('Ошибка при загрузке списка пород:', err);
      });
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  const formatBreedName = (breed) => {
    return breed.split('/').reverse().join(' ');
  };

  return (
    <div className="breed-list">
      <h2>Список пород собак</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Поиск породы..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="breed-scroll-container">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredBreeds.map((breed) => (
            <li
              key={breed}
              className={`breed-item ${selectedBreed === breed ? 'breed-item-selected' : ''}`}
              onClick={() => handleBreedClick(breed)}
            >
              {formatBreedName(breed)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreedList;