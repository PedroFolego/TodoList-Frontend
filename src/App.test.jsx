import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import App from './App';
import '@testing-library/jest-dom';

it('Verifica se titulo renderiza', () => {
  render(<App />);
  const element = screen.getByText('Lista de Tarefas');

  expect(element).toBeInTheDocument();
});
it('Verifica se cabeçalho da tabela renderiza', () => {
  render(<App />);

  const task = screen.getByRole('columnheader', { name: 'Tarefa' });
  const status = screen.getByRole('columnheader', { name: 'Status' });
  const created = screen.getByRole('columnheader', { name: 'Data de Criação' });
  const edith = screen.getByRole('columnheader', { name: 'Editar' });
  const remove = screen.getByRole('columnheader', { name: 'Remover' });

  expect(task).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(created).toBeInTheDocument();
  expect(edith).toBeInTheDocument();
  expect(remove).toBeInTheDocument();
});
it('Verifica se labels renderiza', () => {
  render(<App />);
  const task = screen.getByRole('textbox', { name: 'Tarefa' });
  const status = screen.getByRole('textbox', { name: 'Status' });
  const created = screen.getByRole('textbox', { name: 'Criado' });

  expect(task).toBeInTheDocument();
  expect(status).toBeInTheDocument();
  expect(created).toBeInTheDocument();
});
it('Verifica se botão renderiza', () => {
  render(<App />);
  const btn = screen.getByRole('button', { name: 'Adicionar tarefa' });

  expect(btn).toBeInTheDocument();
});
