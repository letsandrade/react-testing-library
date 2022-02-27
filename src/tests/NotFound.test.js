import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 4 - Teste o componente <NotFound.js />',
  () => {
    it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/page-that-dont-exist');

        const heading404 = screen.getByRole('heading',
          { name: /page requested not found/i,
            level: 2,
          });

        expect(heading404).toBeInTheDocument();
      });

    it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      () => {
        const { history } = renderWithRouter(<App />);
        history.push('/page-that-dont-exist');

        const img404 = screen.getByAltText(/page requested was not found/i);
        const img404URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

        expect(img404).toBeInTheDocument();
        expect(img404.src).toEqual(img404URL);
      });
  });
