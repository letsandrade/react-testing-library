import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('requisito 1', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favsLink = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(homeLink && aboutLink && favsLink).toBeInTheDocument();
    });

  it('Teste se ao clicar no link Home a app redireciona para a home na URL /',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /home/i });
      userEvent.click(linkHome);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

  it('Teste se ao clicar no link About a app redireciona para a page na URL /about',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkAbout);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

  it('Teste se ao clicar no link Fav Pokemons redireciona para a page na URL /favorites',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkFavs = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkFavs);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Teste se redireciona para a page Not Found em URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/url-inexistente');

      const pageNotFound = screen.getByText('Page requested not found');
      expect(pageNotFound).toBeInTheDocument();
    });
});
