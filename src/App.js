import "./App.css";
import CitiesForm from "./Components/CitiesForm";
import UserLocation from "./Components/UserLocation";
import WorldClockList from "./Components/WorldClockList";
import { WorldClockDataProvider } from "./Hooks/useWorldClockContext";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      {/**Display City name and timezone */}
      <UserLocation></UserLocation>
      <WorldClockDataProvider>
        {/**Display Selectbox Citied */}
        <CitiesForm></CitiesForm>

        {/**Display World Clock */}
        <WorldClockList></WorldClockList>
      </WorldClockDataProvider>
    </div>
  );
}

export default App;
