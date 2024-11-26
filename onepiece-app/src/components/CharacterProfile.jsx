import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CharacterProfile = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-onepiece.com/v2/characters/en')
      .then((response) => response.json())
      .then((data) => {
        const selectedCharacter = data.find((c) => c.id === parseInt(id));
        setCharacter(selectedCharacter);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching character:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!character) {
    return <p className="text-center text-white">Personaje no encontrado</p>;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <img
          src={character.fruit?.filename || '/images/placeholder.jpg'}
          alt={character.name}
          className="rounded"
          style={{ maxWidth: '300px', height: 'auto' }}
        />
      </div>
      <div
        className="card mx-auto"
        style={{
          maxWidth: '800px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{character.name}</h1>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Trabajo:</strong> {character.job || 'Desconocido'}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Tamaño:</strong> {character.size || 'Desconocido'}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Cumpleaños:</strong> {character.birthday || 'Desconocido'}
            </div>
            <div className="col-md-6 mb-3">
              <strong>Edad:</strong> {character.age || 'Desconocida'}
            </div>
          </div>
          <h3 className="mt-4">Tripulación</h3>
          <p><strong>Nombre:</strong> {character.crew?.name || 'Ninguna'}</p>
          <h3 className="mt-4">Fruta</h3>
          <p><strong>Nombre:</strong> {character.fruit?.name || 'Ninguna'}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Link to="/characters" className="btn btn-primary text-white">
          ← Volver a la lista
        </Link>
      </div>
    </div>
  );
};

export default CharacterProfile;
