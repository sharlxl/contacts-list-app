import { useState } from 'react';
import ContactsTable from './components/ContactsTable';
import TopMenuBar from './components/TopMenuBar';
import AddItemModal from './components/AddItemModal';
import { ContactsListProvider } from './context/contactslistContext';
import useTheme from './useTheme';

function App() {
  const [showModal, setShowModal] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className='w-full min-w-[100svw] h-full min-h-[100svh]'>
      <ContactsListProvider>
        <TopMenuBar
          setShowModal={setShowModal}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <ContactsTable />
        <AddItemModal showModal={showModal} setShowModal={setShowModal} />
      </ContactsListProvider>
    </div>
  );
}

export default App;
