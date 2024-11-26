import { useEffect, useState } from 'react';

const SagaList = () => {
  const [sagas, setSagas] = useState([]);
  const [loading, setLoading] = useState(true); // Spinner de carga

  useEffect(() => {
    fetch('https://api.api-onepiece.com/v2/sagas/en')
      .then((response) => response.json())
      .then((data) => {
        setSagas(data);
        setLoading(false); // Datos cargados
      })
      .catch((error) => {
        console.error('Error fetching sagas:', error);
        setLoading(false); // Detener el spinner en caso de error
      });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-white">Sagas de One Piece</h1>

      {/* Spinner de carga */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        // Grid de sagas
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {sagas.map((saga) => (
            <div key={saga.id} className="col">
              <div
                className="card h-100"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo transparente
                  color: 'white', // Texto blanco
                  border: '1px solid rgba(255, 255, 255, 0.2)', // Borde tenue
                }}
              >
                <div className="card-body text-center">
                  {/* Título de la saga */}
                  <h5 className="card-title">{saga.tittle}</h5>
                  {/* Detalles de la saga */}
                  <p className="card-text">
                    <strong>Número:</strong> {saga.saga_number || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Capítulos:</strong> {saga.saga_chapitre || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Volúmenes:</strong> {saga.saga_volume || 'N/A'}
                  </p>
                  <p className="card-text">
                    <strong>Episodios:</strong> {saga.saga_episode || 'N/A'}
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

export default SagaList;
