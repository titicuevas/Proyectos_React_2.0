import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import App from '../src/App'
import { beforeEach, afterEach, test, expect, jest } from '@jest/globals'

describe('Pomodoro App', () => {
    let notificationSpy

    beforeEach(() => {
        // Espiar el constructor de Notification
        notificationSpy = jest.spyOn(global, 'Notification').mockImplementation((title, options) => ({
            title,
            options,
            show: jest.fn(), // Simular la función show
        }))

        jest.useFakeTimers()
        render(<App />)
    })

    afterEach(() => {
        jest.clearAllTimers()
        jest.useRealTimers()
        // Restaurar el espía
        notificationSpy.mockRestore()
    })

    test('renders main elements', () => {
        expect(screen.getByRole('heading', { name: /Pomodoro/i })).toBeInTheDocument()
        expect(screen.getByText(/Descanso Corto/i)).toBeInTheDocument()
        expect(screen.getByText(/Descanso Largo/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Iniciar/i })).toBeInTheDocument()
    })

    test('switches to short break mode', () => {
        fireEvent.click(screen.getByText(/Descanso Corto/i))
        expect(screen.getByText(/Descanso Corto/i)).toBeInTheDocument()
        expect(screen.getByText(/5:00/i)).toBeInTheDocument()
    })

    test('starts and pauses timer', () => {
        fireEvent.click(screen.getByText(/Iniciar/i))
        act(() => jest.advanceTimersByTime(1000))
        expect(screen.getByText(/24:59/i)).toBeInTheDocument()

        fireEvent.click(screen.getByText(/Pausar/i))
        act(() => jest.advanceTimersByTime(1000))
        expect(screen.getByText(/24:59/i)).toBeInTheDocument()
    })

  //   test('shows notification with 5 minutes left in Pomodoro mode', () => {
  //     // Simula el inicio del temporizador
  //     fireEvent.click(screen.getByText(/Iniciar/i)) // Inicia el temporizador
  
  //     // Simula el avance del temporizador
  //     act(() => {
  //         jest.advanceTimersByTime(20 * 60 * 1000) // Avanza 20 minutos
  //     })
  
  //     // Verifica que se haya llamado al constructor de Notification
  //     expect(notificationSpy).toHaveBeenCalledTimes(0) // Debe ser llamado 0 veces antes
  
  //     // Simula el tiempo restante de 5 minutos
  //     act(() => {
  //         jest.advanceTimersByTime(5 * 60 * 1000) // Avanza otros 5 minutos
  //     })
  
  //     // Verifica que se haya llamado al constructor de Notification
  //     expect(notificationSpy).toHaveBeenCalledTimes(1) // Debe ser llamado una vez
  //     expect(notificationSpy).toHaveBeenCalledWith('¡Atención!', {
  //         body: 'Quedan 5 minutos en el temporizador.',
  //     })
  // })

    test('resets timer', () => {
        fireEvent.click(screen.getByText(/Descanso Corto/i))
        fireEvent.click(screen.getByText(/Resetear/i))
        expect(screen.getByText(/25:00/i)).toBeInTheDocument()
    })
})
