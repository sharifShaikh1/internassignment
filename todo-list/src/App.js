import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    setTodos([]);
    localStorage.removeItem('token');
    fetch('http://localhost:3001/auth/logout', { method: 'POST' });
  }, []);

  const fetchUser = useCallback(async (token) => {
    try {
      const response = await fetch('http://localhost:3001/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      handleLogout();
    }
  }, [handleLogout]);

  const fetchTodos = useCallback(async (token) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      setToken(currentToken);
      fetchUser(currentToken);
      fetchTodos(currentToken);
    } else {
      setLoading(false);
    }
  }, [fetchUser, fetchTodos]);

  const addTodo = async (text, description, dueDate) => {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, description, dueDate }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const createdTodo = await response.json();
      setTodos([createdTodo, ...todos]);
      setError(null);
      setIsFormVisible(false); // Hide form after successful submission
    } catch (error) {
      console.error('Error adding todo:', error);
      setError('Failed to add todo. Please try again.');
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
      setError(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      setError('Failed to update todo. Please try again.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo. Please try again.');
    }
  };

  const clearCompleted = async () => {
    try {
      const completedTodos = todos.filter(todo => todo.completed);
      const deletePromises = completedTodos.map(todo =>
        fetch(`http://localhost:3001/todos/${todo._id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        })
      );
      await Promise.all(deletePromises);
      setTodos(todos.filter(todo => !todo.completed));
      setError(null);
    } catch (error) {
      console.error('Error clearing completed todos:', error);
      setError('Failed to clear completed todos. Please try again.');
    }
  };

  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    fetchTodos(token);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (!token && !loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        <Sidebar setFilter={setFilter} currentFilter={filter} />
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            
            {/* --- UI Change: Conditional Rendering --- */}
            <div className="mb-6">
              {isFormVisible ? (
                <TodoForm
                  onAdd={addTodo}
                  onCancel={() => setIsFormVisible(false)} // Pass a function to hide the form
                />
              ) : (
                <button
                  onClick={() => setIsFormVisible(true)} // Show the form on click
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition font-semibold"
                >
                  Add New Task
                </button>
              )}
            </div>
            
            <TodoList
              todos={filteredTodos}
              loading={loading}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
            {!loading && todos.length > 0 && (
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-600">
                  {todos.filter(todo => !todo.completed).length} items left
                </span>
                <button
                  onClick={clearCompleted}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Clear Completed
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;