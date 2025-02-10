import { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import FormInput from './FormInput';
import { useContacts } from '../context/contactslistContext';

interface AddItemModalProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => void;
}

interface FormDataProps {
  name: string;
  email: string;
  mobileNum: string;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  showModal,
  setShowModal,
}) => {
  const { addContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNum: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobileNum: '',
  });

  //maybe move this function out. reduce the clutter for readability
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      mobileNum: '',
    };

    //ensure that its not empty or whitespaces only
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    //check for empty/whitespaces and valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    //make sure its not blank and its only integers and 8 digit(SG number)
    const phoneRegex = /^\d{8}$/;
    if (!formData.mobileNum.trim()) {
      newErrors.mobileNum = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.mobileNum)) {
      newErrors.mobileNum = 'Please enter a valid 8 digit phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (validateForm()) {
      // if the formdata are all valid, to update the state and LS
      // reset form and close modal
      addContact(formData);
      setFormData({ name: '', email: '', mobileNum: '' });
      setShowModal(false);
    }
  };

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormDataProps]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  if (!showModal) return null;

  return (
    <ModalWrapper>
      <div className='flex flex-col py-6 px-8 rounded-2xl bg-neutral-200/50 dark:bg-neutral-700/50 shadow-xs shadow-amber-50 w-[90dvw] max-w-lg'>
        <div className='flex justify-between items-center text-2xl font-bold'>
          <p>Add New Contact</p>
          <button
            className='hover:bg-neutral-400 hover:dark:bg-neutral-950 aspect-square w-8 rounded-sm text-center'
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {/* card content */}
          <div className='flex flex-col gap-2 py-4'>
            <FormInput
              label='Name'
              id='name'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
              twcss={errors.name ? 'border-red-500' : ''}
              error={errors.name ?? ''}
            />

            <FormInput
              label='Email'
              id='email'
              name='email'
              type='email'
              placeholder='username@email.com'
              value={formData.email}
              onChange={handleChange}
              twcss={errors.email ? 'border-red-500' : ''}
              error={errors.email}
            />

            <FormInput
              label='Phone Number'
              id='mobileNum'
              name='mobileNum'
              placeholder='XXXXXXXX'
              value={formData.mobileNum}
              onChange={handleChange}
              twcss={errors.mobileNum ? 'border-red-500' : ''}
              error={errors.mobileNum}
            />
          </div>

          {/* card footer */}
          <div>
            <button
              type='submit'
              className='w-full hover:bg-neutral-400 hover:dark:bg-neutral-950 py-2 rounded-sm font-bold'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default AddItemModal;
