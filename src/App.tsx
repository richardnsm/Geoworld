import CountryList from "./components/CountryList"
import CountryDetails from "./components/CountryDetails"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full flex items-center justify-center">
        <main>
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:name" element={<CountryDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
