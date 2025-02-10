import React from 'react';
import { ContactProps } from '../hooks/useContacts';

interface ContactsTableProps {
  contacts: ContactProps[];
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts }) => {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Contacts List</h1>
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-neutral-500 dark:text-neutral-400'>
          <thead className='text-xs text-neutral-700 uppercase bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Telephone
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact: ContactProps, index: number) => (
              <tr
                key={index}
                className='bg-white border-b dark:bg-neutral-800 dark:border-neutral-700 border-neutral-200'
              >
                <th
                  scope='row'
                  className='px-6 py-4 font-medium text-neutral-900 whitespace-nowrap dark:text-white'
                >
                  {contact.name}
                </th>
                <td className='px-6 py-4'>{contact.mobileNum}</td>
                <td className='px-6 py-4'>{contact.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
