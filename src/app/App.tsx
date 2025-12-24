import styles from "./App.module.scss";
import { ServicesPage } from "../pages/ServicesPage";

function App() {
  return (
    <div className={styles.app}>
      <ServicesPage />
    </div>
  );
}

export default App;
