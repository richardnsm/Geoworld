import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    population: number;
}

function CountryList() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${BASE_URL}/all?fields=name,capital,flags,region,population`);

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
                }

                const countries = (await response.json()) as Country[];

                const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

                setCountries(sortedCountries);

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

        fetchCountries();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Erreur lors du chargement : {error.message}</div>;
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-center text-white">
                    Explorateur de Pays
                </h1>
            </header>

            {/* C'EST ICI LA MODIF PRINCIPALE */}
            <div className="flex flex-wrap justify-center gap-4">

                {countries.map((country) => (

                    <Link
                        key={country.name.common}
                        to={`/country/${country.name.common}`}
                        // On donne une largeur fixe à la carte
                        className="w-72"
                    >
                        <div className="bg-white rounded shadow p-4 h-full flex flex-col">
                            <img
                                src={country.flags.png}
                                alt={`Drapeau de ${country.name.common}`}
                                className="w-full h-32 object-contain mb-2 flex-shrink-0"
                            />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-900">{country.name.common}</h2>
                                <p className="text-sm text-gray-600">Région: {country.region}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default CountryList;