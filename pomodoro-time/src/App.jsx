import React, { useState, useEffect, useRef, useMemo } from 'react';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    mode: 'pomodoro',
    time: 25 * 60,
    isActive: false,
    animating: false,
    notified: false,
    showGif: false,
    alarmSource: '/alarm.mp3'
  });
  const alarmRef = useRef(null);

  const modes = useMemo(() => ({
    pomodoro: { label: 'Pomodoro', time: 25 * 60, color: '#FF6347', darkerColor: '#CC4F3B', sound: '/alarma.mp3', message: '¡Concéntrate!' },
    shortBreak: { label: 'Descanso Corto', time: 5 * 60, color: '#ADD8E6', darkerColor: '#8FBED1', sound: './alarma_corta.mp3', message: 'Descansa un poco los ojos.' },
    longBreak: { label: 'Descanso Largo', time: 15 * 60, color: '#90EE90', darkerColor: '#76C276', sound: './alarma_larga.mp3', message: 'Levántate un ratito para relajarte.' }
  }), []);

  const handleModeChange = (newMode) => {
    if (newMode !== state.mode) {
      setState(prevState => ({ ...prevState, animating: true }));
      setTimeout(() => {
        setState({
          mode: newMode,
          time: modes[newMode].time,
          alarmSource: modes[newMode].sound,
          notified: false, // Reset notified when changing mode
          showGif: false,
          animating: false,
          isActive: false
        });
      }, 1000);
    }
  };

  const requestNotificationPermission = () => {
    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    let interval = null;
    if (state.isActive && state.time > 0) {
      interval = setInterval(() => {
        setState(prevState => ({ ...prevState, time: prevState.time - 1 }));
      }, 1000);
    } else if (state.isActive && state.time === 0) {
      clearInterval(interval);
      setState(prevState => ({ ...prevState, isActive: false }));
      try {
        alarmRef.current.play();
        alarmRef.current.onended = () => {
          if (state.mode === 'shortBreak' || state.mode === 'longBreak') {
            handleModeChange('pomodoro'); // Cambiar a pomodoro solo cuando la alarma termine
          }
        };
      } catch (error) {
        console.error('Error al reproducir la alarma:', error);
      }
      setState(prevState => ({ ...prevState, showGif: false }));
    }

    if (state.isActive && state.time === 300 && state.mode === 'pomodoro' && !state.notified) {
      showNotification('¡Atención!', 'Quedan 5 minutos en el temporizador.');
      setState(prevState => ({ ...prevState, notified: true }));
    }

    // Actualiza el título del documento con el tiempo restante y el mensaje correspondiente
    if (state.isActive) {
      const remainingTime = `${Math.floor(state.time / 60)}:${(state.time % 60).toString().padStart(2, '0')}`;
      const currentMessage = modes[state.mode].message;
      document.title = `${remainingTime} - ${currentMessage}`; // Actualiza el título
    } else {
      document.title = 'Pomodoro'; // Título por defecto cuando no está activo
    }

    return () => clearInterval(interval);
  }, [state.isActive, state.time, state.notified, state.mode, modes]);

  const handleStart = () => {
    setState(prevState => ({ ...prevState, isActive: true }));
    if (state.mode === 'shortBreak') {
      showNotification('Descanso Corto', 'Descansa un poco los ojos.');
      setState(prevState => ({ ...prevState, showGif: true }));
    } else if (state.mode === 'longBreak') {
      showNotification('Descanso Largo', 'Levántate un ratito para relajarte.');
      setState(prevState => ({ ...prevState, showGif: true }));
    } else {
      setState(prevState => ({ ...prevState, showGif: false }));
    }
  };

  return (
    <div className={`app-container ${state.animating ? 'rotate-cube' : ''}`} style={{ backgroundColor: modes[state.mode].color }}>
      <div className="mode-buttons">
        <button className="btn btn-danger mx-2" onClick={() => handleModeChange('pomodoro')}>Pomodoro</button>
        <button className="btn btn-primary mx-2" onClick={() => handleModeChange('shortBreak')}>Descanso Corto</button>
        <button className="btn btn-success mx-2" onClick={() => handleModeChange('longBreak')}>Descanso Largo</button>
      </div>
      <div className="timer-section" style={{ backgroundColor: modes[state.mode].darkerColor, padding: '20px', borderRadius: '10px' }}>
        <h1 style={{ color: '#FFE4E1' }}>{modes[state.mode].label}</h1>
        <h2 className="timer" style={{ color: '#FFE4E1' }}>{Math.floor(state.time / 60)}:{(state.time % 60).toString().padStart(2, '0')}</h2>
      </div>
      {state.showGif && (
        <div className="gif-container">
          <img src="/5min.webp" alt="Descanso" className="gif" />
        </div>
      )}
      <div className="control-buttons">
        <button className="btn btn-warning mx-2" onClick={state.isActive ? () => setState(prevState => ({ ...prevState, isActive: false })) : handleStart}>
          {state.isActive ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => setState(prevState => ({ ...prevState, time: modes[state.mode].time, notified: false }))}>Resetear</button>
      </div>
      <audio ref={alarmRef} src={state.alarmSource} preload="auto" />
    </div>
  );
};

export default App;
