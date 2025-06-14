function Header({ user, onLogout }) {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Todo App</h1>
        {/* Add a check to ensure user exists before showing the welcome message */}
        {user && (
          <nav className="flex items-center space-x-4">
            <span className="text-sm font-medium">Welcome, {user.username}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;