import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BASE_URL = 'https://restcountries.com/v3.1'

interface Country {
  name: {
    common: string;
  };
  capital: string[];
  flags: {
    png: string;
  };
  region: string;
  subregion: string;
  population: number;
  borders: string[];
}

function CountryDetails() {
  const { name } = useParams<{ name: string }>();

  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchCountry = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_URL}/name/${name}?fullText=true`);
        
        if (!response.ok) {
          throw new Error(`Pays non trouvé: ${response.statusText}`);
        }
        
        const data = (await response.json()) as Country[];
        setCountry(data[0]); 

      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Une erreur inconnue est survenue'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, [name]); 

  if (isLoading) {
    return <div>Chargement des détails...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erreur : {error.message}</div>;
  }

  if (!country) {
    return <div>Aucun pays à afficher.</div>;
  }

  return (
    <>
      {/* Titre placé en haut à gauche */}
      <h1 className="absolute top-8 left-8 text-3xl font-bold text-white">Détails</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
          &larr; Retour à la liste
        </Link>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8 flex-shrink-0">
            <img 
              src={country.flags.png} 
              alt={`Drapeau de ${country.name.common}`} 
              className="w-full h-auto object-contain rounded shadow"
            />
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0 text-gray-900">
            <h1 className="text-4xl font-bold mb-4">{country.name.common}</h1>
            <p className="text-lg mb-2"><strong>Capitale :</strong> {country.capital?.[0] || 'N/A'}</p>
            <p className="text-lg mb-2"><strong>Région :</strong> {country.region}</p>
            <p className="text-lg mb-2"><strong>Sous-région :</strong> {country.subregion || 'N/A'}</p>
            <p className="text-lg mb-2"><strong>Population :</strong> {country.population.toLocaleString()}</p>
            <p className="text-lg mb-2"><strong>Frontières :</strong> {country.borders?.join(', ') || 'Aucune'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetails;