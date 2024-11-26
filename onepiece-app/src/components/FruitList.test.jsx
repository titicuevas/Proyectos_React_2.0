import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, test, expect, jest } from '@jest/globals';
import FruitList from './FruitList';

beforeEach(() => {
  jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
});

describe('FruitList Component', () => {
  test('muestra el spinner mientras carga', () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(
      <MemoryRouter>
        <FruitList />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('muestra la lista de frutas después de cargar', async () => {
    const mockFruits = [
      { id: 1, name: 'Gomu Gomu no Mi', type: 'Paramecia', description: 'Elástico' },
      { id: 2, name: 'Mera Mera no Mi', type: 'Logia', description: 'Fuego' },
    ];

    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFruits),
      })
    );

    render(
      <MemoryRouter>
        <FruitList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Gomu Gomu no Mi')).toBeInTheDocument();
      expect(screen.getByText('Mera Mera no Mi')).toBeInTheDocument();
    });
  });
});
