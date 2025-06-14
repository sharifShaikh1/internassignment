import { useState } from 'react';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDescription, setEditDescription] = useState(todo.description || ''); // State for description
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleToggle = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  const handleEditSave = () => {
    if (!editText.trim()) {
      setError('Todo title cannot be empty');
      return;
    }
    if (editText.length > 200) {
      setError('Todo title cannot exceed 200 characters');
      return;
    }
    // Add description to the update payload
    onUpdate(todo._id, {
      text: editText,
      description: editDescription,
      dueDate: editDueDate || null
    });
    setIsEditing(false);
    setError('');
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
    setEditDescription(todo.description || ''); // Reset description on cancel
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '');
    setError('');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const getDaysRemainingText = (days) => {
    if (days === null || days === undefined) return null;
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const daysRemainingText = getDaysRemainingText(todo.daysRemaining);

  return (
    <li className={`p-4 rounded-lg shadow-sm transition-all duration-200 ${todo.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
      {isEditing ? (
        // --- EDITING VIEW ---
        <div className="flex-1 flex flex-col gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="3"
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            min={today}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex space-x-2">
            <button onClick={handleEditSave} className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition">Save</button>
            <button onClick={handleEditCancel} className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600 transition">Cancel</button>
          </div>
        </div>
      ) : (
        // --- DISPLAY VIEW ---
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="h-5 w-5 mt-1 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
            />
            <div className="flex-1">
              <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.text}
              </span>
              {/* Display description if it exists */}
              {todo.description && (
                <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
              )}
              <div className="text-xs text-gray-500 mt-2">
                {todo.completed
                  ? `Completed: ${formatDate(todo.completedAt)}`
                  : `Created: ${formatDate(todo.createdAt)}`}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            {!todo.completed && todo.dueDate && (
              <div className="text-right">
                <p className="font-semibold">{formatDate(todo.dueDate)}</p>
                <p className={todo.daysRemaining < 0 ? 'text-red-500' : 'text-green-600'}>
                  {daysRemainingText}
                </p>
              </div>
            )}
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700 font-semibold transition">Edit</button>
              <button onClick={() => onDelete(todo._id)} className="text-red-500 hover:text-red-700 font-semibold transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;