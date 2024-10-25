import '@testing-library/jest-dom';

global.Notification = jest.fn().mockImplementation((title, options) => {
    return {
        title,
        options,
        show: jest.fn(),
    };
});

global.Notification.permission = 'granted';
global.Notification.requestPermission = jest.fn().mockResolvedValue('granted');
