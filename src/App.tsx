
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <Home />
      </Provider>
    </>
  );
}

export default App;
