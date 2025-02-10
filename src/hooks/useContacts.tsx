import { useEffect, useState } from 'react';
import sampleData from '../data/sample.json';

export interface ContactProps {
  name: string;
  mobileNum: string;
  email: string;
}

const LocalStorageKeys = {
  CONTACTS: 'CONTACTS',
};

export const useContacts = () => {
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

  return { contacts };
};
