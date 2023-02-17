import './App.css';
import RoutesApp from './routes';
import Header from './components/Header/Header';
import DataProvider from './components/context/data-provider';
function App() {
  return (
    <div className="App">
    <DataProvider>
      <Header />
      <RoutesApp />
    </DataProvider>
    </div>
  );
}

export default App;
