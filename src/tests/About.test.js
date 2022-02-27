import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('requisito 2 - testar o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex',
    async () => {
      renderWithRouter(<About />);
      const infoPokedex = screen.getByText(/about/i);

      expect(infoPokedex).toBeInTheDocument();
    });

  it('Teste se a página contém um heading h2 com o texto About Pokédex',
    () => {
      renderWithRouter(<About />);

      const headingEl = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

      expect(headingEl).toBeInTheDocument();
    });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      renderWithRouter(<About />);

      const paragraf1 = screen.getByText(/application simulates a Pokédex/i);
      const paragraf2 = screen.getByText(/see more details for each/i);

      expect(paragraf1 && paragraf2).toBeInTheDocument();
    });

  it('Teste se a página contém a seguinte imagem de uma Pokédex',
    () => {
      renderWithRouter(<About />);
      const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const imgElem = screen.getByRole('img');

      expect(imgElem.src).toBe(imgURL);
    });
});
