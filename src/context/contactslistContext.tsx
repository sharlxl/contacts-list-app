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
  addContact: (newContact: ContactProps) => void;
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
      setContacts(JSON.parse(storedContacts) as ContactProps[]);
    } else {
      setContacts(sampleData);
      localStorage.setItem(
        LocalStorageKeys.CONTACTS,
        JSON.stringify(sampleData)
      );
    }
  }, []);

  const addContact = (newContact: ContactProps) => {
    const updatedContacts = [newContact, ...contacts];
    setContacts(updatedContacts);
    localStorage.setItem(
      LocalStorageKeys.CONTACTS,
      JSON.stringify(updatedContacts)
    );
  };

  return (
    <ContactListContext.Provider value={{ contacts, setContacts, addContact }}>
      {children}
    </ContactListContext.Provider>
  );
};

export const useContacts = (): ContactsListContextType => {
  const context = useContext(ContactListContext);
  if (!context) {
    throw new Error(
      'useContacts must be used within a ContactListContextProvider'
    );
  }
  return context;
};
