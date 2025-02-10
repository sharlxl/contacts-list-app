import ContactsTable from './components/ContactsTable';
import { useContacts } from './hooks/useContacts';

function App() {
  const { contacts } = useContacts();

  return (
    <>
      <ContactsTable contacts={contacts} />
    </>
  );
}

export default App;
