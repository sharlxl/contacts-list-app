import { createContext, useContext, useEffect, useState } from 'react';
import sampleData from '../data/sample.json';
import { LocalStorageKeys } from '../data/common';

export interface ContactProps {
  name: string;
  mobileNum: string;
  email: string;
}

interface ContactsListContextType {
  contacts: ContactProps[];
  setContacts: (contacts: ContactProps[]) => void;
}

interface ContactsListProviderProps {
  children: React.ReactNode;
}

const ContactListContext = createContext<ContactsListContextType | undefined>(
  undefined
);

export const ContactsListProvider: React.FC<ContactsListProviderProps> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<ContactProps[]>([]);

  useEffect(() => {
    /**
     * first is to check the LS for existing data
     * if data exists, load the data from LS
     * if new user, load a sample JSON data as placeholder
     *  */
    const storedContacts = localStorage.getItem(LocalStorageKeys.CONTACTS);

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    } else {
      setContacts(sampleData);
      localStorage.setItem(
        LocalStorageKeys.CONTACTS,
        JSON.stringify(sampleData)
      );
    }
  }, []);

  return (
    <ContactListContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactListContext.Provider>
  );
};

export const useContacts = (): ContactsListContextType => {
  const context = useContext(ContactListContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};
