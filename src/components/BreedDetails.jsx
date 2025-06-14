import React, { useEffect, useState } from 'react';

const BreedDetails = ({ selectedBreed }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedBreed) return;

    setLoading(true);
    setError('');

    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка запроса к API');
        }
        return res.json();
      })
      .then((data) => {
        if (!data || typeof data.message !== 'string') {
          throw new Error('Неверный формат ответа от API');
        }
        setImageUrl(data.message);
        setError('');
      })
      .catch((err) => {
        console.error(err);
        setError('Не удалось загрузить изображение породы.');
        setImageUrl('');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBreed]);

  const formatBreedName = (breed) => {
    return breed.split('/').reverse().join(' ');
  };

  if (!selectedBreed) {
    return (
      <div className="breed-details">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Выберите породу</h2>
          <p>Выберите породу из списка слева, чтобы увидеть изображение.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="breed-details">
      <h2>Порода: {formatBreedName(selectedBreed)}</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {loading && <p style={{ textAlign: 'center' }}>Загрузка изображения...</p>}
      {imageUrl && !loading && (
        <img 
          src={imageUrl} 
          alt={formatBreedName(selectedBreed)} 
          className="breed-image"
        />
      )}
    </div>
  );
};

export default BreedDetails;