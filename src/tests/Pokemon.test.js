import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6 - Teste o componente <Pokemon.js />',
  () => {
    it('Teste se é renderizado um card com as informações de determinado pokémon',
      () => {
        renderWithRouter(<App />);
        const currPokemonName = screen.getByTestId('pokemon-name').innerHTML;
        const currPokemonType = screen.getByTestId('pokemon-type'); // tive que mudar esse pq o stryker tirou o data-test-id -_-'
        const currPokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
        const detailsLink = screen.getByRole('link', { name: /more details/i });
        userEvent.click(detailsLink);

        const detailsPokeName = screen.getByTestId('pokemon-name').innerHTML;
        const detailsPokeType = screen.getByTestId('pokemon-type');
        const detailsPokeWeight = screen.getByTestId('pokemon-weight').innerHTML;
        const detailsPokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });

        expect(currPokemonName).toEqual(detailsPokeName);
        expect(currPokemonWeight).toEqual(detailsPokeWeight);
        expect(currPokemonType).toHaveTextContent(/electric/i);
        expect(detailsPokeType).toHaveTextContent(/electric/i);
        expect(detailsPokemonImg).toBeInTheDocument();
        expect(detailsPokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      });

    it('Teste se há o link details. Deve ter a URL /pokemons/<id>, id do Pokémon exibido',
      () => {
        const { history } = renderWithRouter(<App />);
        const dragonButton = screen.getByRole('button', { name: /dragon/i });
        userEvent.click(dragonButton);

        const linkDetails = screen.getByRole('link', { name: /more details/i });
        userEvent.click(linkDetails);

        const selectedPokemonName = screen.getByText(/dragonair details/i);
        expect(selectedPokemonName).toBeInTheDocument();

        const { pathname } = history.location;
        expect(pathname).toBe('/pokemons/148');
      });

    it('Teste se existe um ícone de estrela nos Pokémons favoritados',
      () => {
        renderWithRouter(<App />);
        const poisonButton = screen.getByRole('button', { name: /poison/i });
        userEvent.click(poisonButton);

        const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
        userEvent.click(linkMoreDetails);

        const favCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
        userEvent.click(favCheckbox);
        const starIcon = screen.getByRole('img', { name: /marked as favorite/i });
        const iconURL = 'http://localhost/star-icon.svg';
        expect(starIcon).toHaveProperty('src', iconURL);
      });
  });
