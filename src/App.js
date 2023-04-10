import "./App.css";
import BannerBar from "./BannerBar";
import Table from "./Table";

import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <BannerBar />
        <Table />
      </Container>
    </div>
  );
}

export default App;
