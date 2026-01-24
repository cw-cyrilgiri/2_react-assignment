import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UsedCarsPage from "./pages/UsedCarsPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsedCarsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
