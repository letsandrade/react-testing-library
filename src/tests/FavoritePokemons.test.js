import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />',
  () => {
    it('Teste se No favorite pokemon found, é exibido caso não haja pokémons favoritos.',
      () => {
        renderWithRouter(<FavoritePokemons />);

        const noFavsMessage = screen.getByText(/No favorite pokemon found/i);

        expect(noFavsMessage).toBeInTheDocument();
      });

    it('Teste se é exibido todos os cards de pokémons favoritados',
      () => {
        const { history } = renderWithRouter(<App />);
        let favoriteCounter = 0;
        // ao entrar na pagina encontra o link para ver mais detalhes e clica
        const detailsLink = screen.getByRole('link', { name: /more details/i });
        userEvent.click(detailsLink);
        // ao entrat na pagina detalhes encontra o checkbox para favoritar e clica
        const favCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
        userEvent.click(favCheckbox);
        favoriteCounter += 1;
        // encontra o link home e clica
        const homeLink = screen.getByRole('link', { name: /home/i });
        userEvent.click(homeLink);
        // adicionar mais um pokemon aos favoritos
        const psychicButton = screen.getByRole('button', { name: /psychic/i });
        userEvent.click(psychicButton);
        const detailsPsychic = screen.getByRole('link', { name: /more details/i });
        userEvent.click(detailsPsychic);
        const psyCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
        userEvent.click(psyCheckbox);
        favoriteCounter += 1;
        userEvent.click(homeLink);
        // adicionar mais um pokemon aos favoritos
        const normalButton = screen.getByRole('button', { name: /normal/i });
        userEvent.click(normalButton);
        const detailsNormal = screen.getByRole('link', { name: /more details/i });
        userEvent.click(detailsNormal);
        const normalCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
        userEvent.click(normalCheckbox);
        favoriteCounter += 1;
        userEvent.click(homeLink);
        // adicionar mais um pokemon aos favoritos com clique no botao prox
        const fireButton = screen.getByRole('button', { name: /fire/i });
        userEvent.click(fireButton);
        const proxButton = screen.getByRole('button', { name: /próximo pokémon/i });
        userEvent.click(proxButton);
        const detailsFire = screen.getByRole('link', { name: /more details/i });
        userEvent.click(detailsFire);
        const fireCheckbox = screen.getByRole('checkbox', { name: /favoritado/i });
        userEvent.click(fireCheckbox);
        favoriteCounter += 1;
        userEvent.click(homeLink);

        // acessar favoritos e verificar se os pokemons são exibidos
        history.push('/favorites');
        const savedFavorites = screen.getAllByRole('link', { name: 'More details' });
        // console.log(savedFavorites.length);
        expect(savedFavorites.length).toEqual(favoriteCounter);
      });
  });
