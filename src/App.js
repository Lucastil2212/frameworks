import "./App.css";
import BannerBar from "./BannerBar";
import Table from "./FrameworksTable";

import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <BannerBar />
      </Container>
    </div>
  );
}

export default App;
