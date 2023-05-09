import { useState, ChangeEvent } from 'react';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const suggestions = ['25161', '26585', '26718', 'Edgar Jimenez', 'Hector Suarez', 'Juan Lopez'].filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  //const handleSuggestionClick = (suggestion: string) => {
  //  window.location.href = '/adminAsign';
  //};

  return (
    <div className="flex flex-row w-screen justify-center items-center ">
      <div className="w-3/6">
        <form className="flex flex-col m-4 items-center">
          <label className="mb-3 block text-lg font-bold" style={{ textAlign: 'center' }}>
            Nombre o Clave de alumno o profesor
          </label>
          <input
            className="h-1/4 py-2 px-10 shadow appearance-none rounded w-5/6 mb-10"
            type="text"
            placeholder="Nombre/Clave"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="border border-gray-300 rounded w-5/6 overflow-auto max-h-40">
            {suggestions.map((suggestion) => (
              <li key={suggestion} className="p-2 hover:bg-gray-100"    >
                {suggestion}
              </li> //onClick={() => handleSuggestionClick(suggestion)}
            ))}
          </ul>
          )}
          <button className="btn btn-wide">Mostrar Usuario</button>
        </form>
      </div>
    </div>
  );
};

export default SearchUser;
