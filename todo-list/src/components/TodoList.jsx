import TodoItem from './TodoItem';

function TodoList({ todos, loading, onUpdate, onDelete }) {
  // Show a loading message
  if (loading) {
    return <p className="text-gray-500 text-center py-4">Loading tasks...</p>;
  }

  // Show a message if there are no todos
  if (todos.length === 0) {
    return <p className="text-gray-500 text-center py-4">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="space-y-3 transition-all duration-300">
      {todos.map(todo => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;