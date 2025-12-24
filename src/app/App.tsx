import { ServicesPage } from '../pages/ServicesPage';
import { Header } from '../widgets/Header';

import styles from './App.module.scss';

function App() {
  return (
    <main className={styles.app}>
      <Header />
      <ServicesPage />
    </main>
  );
}

export default App;
