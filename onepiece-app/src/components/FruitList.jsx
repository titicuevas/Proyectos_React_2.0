import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FruitList = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.api-onepiece.com/v2/fruits/en')
      .then((response) => response.json())
      .then((data) => {
        setFruits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching fruits:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mb-4">
        <Link to="/" className="btn btn-primary text-white">
          ← Volver a inicio
        </Link>
      </div>
      <h1 className="text-center mb-4 text-white">Frutas de One Piece</h1>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '200px' }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
          {fruits.map((fruit) => (
            <div key={fruit.id} className="col">
              <div
                className="card h-100"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <img
                  src={fruit.filename || '/images/placeholder.jpg'}
                  className="card-img-top"
                  alt={fruit.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title" style={{ color: 'white' }}>
                    {fruit.name}
                  </h5>
                  <p className="card-text" style={{ color: 'white' }}>
                    {fruit.type}
                  </p>
                  <p className="card-text" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {fruit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FruitList;
