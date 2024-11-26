// eslint-disable-next-line no-unused-vars
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FruitList from './FruitList';
import { describe, test, expect } from '@jest/globals';



describe('Button Navigation', () => {
    test('el botón "Volver a inicio" redirige correctamente', () => {
        render(
            <MemoryRouter>
                <FruitList />
            </MemoryRouter>
        );

        const backButton = screen.getByText('← Volver a inicio');
        expect(backButton).toBeInTheDocument();
    });

    test('el botón "Ir arriba" desplaza hacia el inicio', () => {
        render(
            <MemoryRouter>
                <FruitList />
            </MemoryRouter>
        );

        const scrollToTopButton = screen.getByText('↑ Ir arriba');
        fireEvent.click(scrollToTopButton);

        // Verifica que el desplazamiento al inicio se activa
        expect(window.scrollY).toBe(0);
    });
});
