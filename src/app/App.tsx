import styles from "./App.module.scss";
import { ServicesPage } from "../pages/ServicesPage";
import { Header } from "../widgets/Header";

function App() {
  return (
    <main className={styles.app}>
      <Header />
      <ServicesPage />
    </main>
  );
}

export default App;
