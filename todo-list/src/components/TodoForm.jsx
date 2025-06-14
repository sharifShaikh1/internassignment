import { useState } from 'react';

function TodoForm({ onAdd, onCancel }) { // Accept onCancel prop
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Todo title cannot be empty');
      return;
    }
    if (text.length > 200) {
      setError('Todo title cannot exceed 200 characters');
      return;
    }
    onAdd(text, description, dueDate || null);
  };

  return (
    // Added a border and padding to better separate the form
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-gray-50 animate-fade-in">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task Title (e.g., Finish report)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description... (Optional)"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        ></textarea>
        <div className="flex flex-col">
          <label htmlFor="dueDate" className="text-sm font-medium text-gray-600 mb-1">Due Date (Optional)</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={today}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      {/* --- UI Change: Added Buttons Container --- */}
      <div className="mt-4 flex items-center justify-end gap-3">
        <button
          type="button" // Important: type="button" to prevent form submission
          onClick={onCancel} // Call the onCancel function passed from App.js
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;