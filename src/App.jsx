import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todoList, setList] = useState([]);
  const [todo, setTodo] = useState('');
  const [status, setStatus] = useState('pendente');
  const [criado, setCriado] = useState('');
  const [id, setId] = useState(0);
  const [btnSaveEdith, setBtnSaveEdith] = useState(true);

  const getTodoList = async () => {
    const response = await axios.get('http://127.0.0.1:3030/');
    setList(response.data);
  };

  const createTodo = async () => {
    await axios.post('http://127.0.0.1:3030/', {
      todo, status, criado,
    });
    setCriado('');
    setStatus('');
    setTodo('');
    getTodoList();
  };

  const removeTodo = async (idTask) => {
    await axios.delete('http://127.0.0.1:3030/', { data: { id: idTask } });
    getTodoList();
  };

  const saveEditedTodo = async () => {
    await axios.put('http://127.0.0.1:3030/', {
      id, todo, status, criado,
    });
    getTodoList();
    setId(0);
    setBtnSaveEdith(true);

    setCriado('');
    setStatus('');
    setTodo('');
  };

  const edithTodo = async (eId, eTodo, eStatus, eCriado) => {
    setId(eId);
    if (eId === id) {
      setBtnSaveEdith(!btnSaveEdith);
    } else { setBtnSaveEdith(false); }

    setCriado(eCriado);
    setStatus(eStatus);
    setTodo(eTodo);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <main>
      <h1>Lista de Tarefas</h1>
      <table>
        <tbody>

          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Data de Criação</th>
            <th>Editar</th>
            <th>Remover</th>
          </tr>
          {todoList.map((t) => (
            <tr key={t.id}>
              <td>{t.todo}</td>
              <td>{t.status}</td>
              <td>{t.criado}</td>
              <button type="button" onClick={() => edithTodo(t.id, t.todo, t.status, t.criado)}>alterar</button>
              <button type="button" onClick={() => removeTodo(t.id)}>remover</button>

            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <label htmlFor="todo">
          <span>Tarefa</span>
          <input
            type="text"
            name="todo"
            onChange={(e) => setTodo(e.target.value)}
            id="todo"
            value={todo}
          />
        </label>
        <label htmlFor="status">
          <span>Status</span>
          <input
            type="text"
            name="status"
            onChange={(e) => setStatus(e.target.value)}
            id="status"
            value={status}
          />
        </label>
        <label htmlFor="criado">
          <span>criado</span>
          <input
            type="text"
            name="criado"
            onChange={(e) => setCriado(e.target.value)}
            id="criado"
            value={criado}
          />
        </label>
        {btnSaveEdith ? (
          <button
            type="button"
            onClick={createTodo}
          >
            Adicionar tarefa
          </button>
        ) : (
          <button
            type="button"
            onClick={saveEditedTodo}
          >
            Atualizar tarefa
          </button>
        )}
      </form>
    </main>
  );
}

export default App;
