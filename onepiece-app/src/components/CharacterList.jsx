import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-onepiece.com/v2/characters/en')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setLoading(false);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Scroll suave integrado
    });
  };

  return (
    <div className="container py-5">
      {/* Botón "Volver a inicio" */}
      <div className="d-flex justify-content-center mb-4">
        <Link to="/" className="btn btn-primary text-white">
          ← Volver a inicio
        </Link>
      </div>
      <h1 className="text-center mb-4 text-white">Personajes de One Piece</h1>

      {/* Spinner de carga */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {characters.map((character) => (
            <div key={character.id} className="col">
              <Link to={`/characters/${character.id}`} className="text-decoration-none">
                <div
                  className="card h-100"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <img
                    src={character.fruit?.filename || '/images/placeholder.jpg'}
                    className="card-img-top"
                    alt={character.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{character.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
      {/* Botón de volver arriba */}
      <button
        onClick={scrollToTop}
        className="btn btn-primary position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1000 }}
      >
        ↑ Ir arriba
      </button>
    </div>
  );
};

export default CharacterList;
