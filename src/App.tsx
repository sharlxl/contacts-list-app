import { useState } from 'react';
import ContactsTable from './components/ContactsTable';
import TopMenuBar from './components/TopMenuBar';
import AddItemModal from './components/AddItemModal';
import { ContactsListProvider } from './context/contactslistContext';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ContactsListProvider>
        <TopMenuBar setShowModal={setShowModal} />
        <ContactsTable />
        <AddItemModal showModal={showModal} setShowModal={setShowModal} />
      </ContactsListProvider>
    </>
  );
}

export default App;
