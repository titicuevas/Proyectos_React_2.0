import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import CharacterList from './components/CharacterList'
import CharacterProfile from './components/CharacterProfile' // Ruta dinámica para personajes
import SagaList from './components/SagaList'
import FruitList from './components/FruitList'
import HakiList from './components/HakiList'
import CrewList from './components/CrewList'
import BoatList from './components/BoatList'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'






const Home = () => {
  const sections = [
    { name: 'Personajes', link: '/characters', img: '/images/characters/characters.jpg' },
    { name: 'Sagas', link: '/sagas', img: '/images/sagas/Holly.jpg' },
    { name: 'Frutas', link: '/fruits', img: '/images/fruits/gomu.jpg' },
    { name: 'Haki', link: '/hakis', img: '/images/hakis/haki.jpg' },
    { name: 'Tripulaciones', link: '/crews', img: '/images/crews/mugis.jpg' },
    { name: 'Barcos', link: '/boats', img: '/images/boats/mery.jpg' },
  ]

  return (
    <div className="text-center py-5">
      <h1 className="mb-4">Bienvenido a la App de One Piece</h1>
      <p className="mb-5">Explora las diferentes secciones:</p>

      <div className="sections-container">
        {sections.map((section) => (
          <div key={section.name} className="section-card">
            <Link to={section.link}>
              <Zoom>
                <div
                  className="section-card-image"
                  style={{ backgroundImage: `url(${section.img})` }}
                ></div>
              </Zoom>
              <h2 className="section-title">{section.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}


const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#D4EDDA', // Verde clarito
        color: '#155724', // Texto verde oscuro
        padding: '1rem 0',
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <p style={{ margin: 0 }}>
        Diseñado por Enrique Cuevas, uso de API de{' '}
        <a
          href="https://api-onepiece.com/en"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#155724', textDecoration: 'underline' }}
        >
          api-onepiece.com
        </a>
      </p>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<CharacterList />} />
          <Route path="/characters/:id" element={<CharacterProfile />} />
          <Route path="/sagas" element={<SagaList />} />
          <Route path="/fruits" element={<FruitList />} />
          <Route path="/hakis" element={<HakiList />} />
          <Route path="/crews" element={<CrewList />} />
          <Route path="/boats" element={<BoatList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
