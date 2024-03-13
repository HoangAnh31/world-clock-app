import "./App.css";
import SelectedCities from "./Components/SelectedCities";
import UserLocation from "./Components/UserLocation";
import WorldClockList from "./Components/WorldClockList";
import { WorldClockDataProvider } from "./Hooks/useWorldClockContext";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <WorldClockDataProvider>
        {/**Display City name and timezone */}
        <UserLocation></UserLocation>

        {/**Display Selectbox Citied */}
        <SelectedCities></SelectedCities>

        {/**Display World Clock */}
        <WorldClockList></WorldClockList>
      </WorldClockDataProvider>
    </div>
  );
}

export default App;
