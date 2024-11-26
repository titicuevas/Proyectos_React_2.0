// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, jest } from '@jest/globals';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterProfile from './CharacterProfile';


describe('CharacterProfile Component', () => {
  test('muestra el spinner mientras carga', () => {
    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar que el spinner aparece
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('muestra el perfil del personaje', async () => {
    // Mock de datos de personaje
    const mockCharacter = {
      id: 1,
      name: 'Monkey D. Luffy',
      job: 'Capitán',
      size: '1.74m',
      birthday: '5 de mayo',
      age: '19',
      bounty: '1,500,000,000 Berries',
      status: 'Activo',
      crew: { name: 'Sombrero de Paja', description: 'Una banda pirata conocida' },
      fruit: { name: 'Gomu Gomu no Mi', description: 'Permite al usuario ser elástico', type: 'Paramecia' },
    };

    // Mock del fetch
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockCharacter]),
      })
    );

    render(
      <MemoryRouter initialEntries={['/characters/1']}>
        <Routes>
          <Route path="/characters/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    // Esperar a que aparezcan los datos del personaje
    await waitFor(() => {
      expect(screen.getByText('Monkey D. Luffy')).toBeInTheDocument();
      expect(screen.getByText('Capitán')).toBeInTheDocument();
      expect(screen.getByText('Gomu Gomu no Mi')).toBeInTheDocument();
    });
  });
});
