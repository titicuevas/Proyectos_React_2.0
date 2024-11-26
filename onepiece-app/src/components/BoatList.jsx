import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoatList = () => {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-onepiece.com/v2/boats/en')
      .then((response) => response.json())
      .then((data) => {
        setBoats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching boats:', error);
        setLoading(false);
      });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mb-4">
        <Link to="/" className="btn btn-primary text-white">
          ← Volver a inicio
        </Link>
      </div>
      <h1 className="text-center mb-4 text-white">Barcos de One Piece</h1>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {boats.map((boat) => (
            <div key={boat.id} className="col">
              <div
                className="card h-100"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{boat.name}</h5>
                  <p className="card-text">{boat.description || 'No disponible'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

export default BoatList;
