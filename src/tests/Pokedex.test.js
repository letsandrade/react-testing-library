import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5 - Teste o componente <Pokedex.js />',
  () => {
    it('Teste se página contém um heading h2 com o texto Encountered pokémons',
      () => {
        renderWithRouter(<App />);

        const headingEnc = screen.getByRole('heading',
          { name: /encountered pokémons/i,
            level: 2,
          });

        expect(headingEnc).toBeInTheDocument();
      });

    it('Teste se é exibido o próximo da lista quando o botão Próximo pokémon é clicado',
      () => {
        renderWithRouter(<App />);

        const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
        expect(buttonProximo).toBeInTheDocument();

        const poksTestId = 'pokemon-name';
        const firstPokemon = screen.getByTestId(poksTestId);
        expect(firstPokemon).toHaveTextContent(/pikachu/i);
        userEvent.click(buttonProximo);

        const secondPokemon = screen.getByTestId(poksTestId);
        expect(secondPokemon).toHaveTextContent(/charmander/i);
        userEvent.click(buttonProximo);

        const thirdPokemon = screen.getByTestId(poksTestId);
        expect(thirdPokemon).toHaveTextContent(/caterpie/i);
      });

    it('Teste se é mostrado apenas um Pokémon por vez',
      () => {
        renderWithRouter(<App />);
        const currPokemonArr = screen.getAllByTestId('pokemon-name');
        expect(currPokemonArr.length).toStrictEqual(1);
        // peguei a ideia desse link https://stackoverflow.com/questions/60948960/test-for-an-element-to-exist-only-once-in-jest-rtl
      });

    it('Teste se a Pokédex tem os botões de filtro',
      () => {
        renderWithRouter(<App />);
        const filterButtons = screen.getAllByTestId('pokemon-type-button');
        // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição
        // aqui percorro o array clicando em cada um e checando que o tipo exibido é correspondente
        filterButtons.forEach((button) => {
          userEvent.click(button);
          const currButtonName = button.innerHTML;
          const currPokemonType = screen.getByTestId('pokemon-type').innerHTML;

          expect(button).toBeInTheDocument();
          expect(button).toHaveTextContent(currPokemonType);
          expect(currButtonName).toEqual(currPokemonType);
        });
      });

    it('Teste se a Pokédex contém um botão para resetar o filtro',
      () => {
        renderWithRouter(<App />);
        const buttonBug = screen.getByRole('button', { name: /bug/i });
        userEvent.click(buttonBug);
        const pokeBug = screen.getByTestId('pokemon-type');
        expect(pokeBug).toHaveTextContent(buttonBug.innerHTML);

        const buttonAll = screen.getByRole('button', { name: /all/i });
        userEvent.click(buttonAll);
        const ResetPokemonType = screen.getByTestId('pokemon-type');
        expect(buttonAll).toBeInTheDocument();
        expect(ResetPokemonType).toBeInTheDocument();
        expect(ResetPokemonType.innerHTML).not.toBe(/bug/i);
      });
  });
