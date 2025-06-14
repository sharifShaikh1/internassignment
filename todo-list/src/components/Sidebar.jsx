function Sidebar({ setFilter, currentFilter }) {
  const filters = [
    { name: 'All', value: 'all' },
    { name: 'Active', value: 'active' },
    { name: 'Completed', value: 'completed' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <ul className="space-y-2">
        {filters.map(filter => (
          <li key={filter.value}>
            <button
              onClick={() => setFilter(filter.value)}
              className={`w-full text-left p-2 rounded ${
                currentFilter === filter.value
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-700'
              } transition`}
            >
              {filter.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;