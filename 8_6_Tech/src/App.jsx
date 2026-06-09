function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Demo Vite + Tailwind CSS
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-3">
          Card Demo
        </h2>

        <p className="text-gray-600 mb-4">
          Đây là component được tạo bằng Tailwind CSS.
        </p>

        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;