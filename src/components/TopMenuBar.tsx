import LightIcon from '../assets/sun.svg';
import DarkIcon from '../assets/moon.svg';

interface TopMenuBarProps {
  setShowModal: (arg0: boolean) => void;
  darkMode: boolean | null;
  toggleDarkMode: () => void;
}

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({
  setShowModal,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div className='flex gap-2 bg-neutral-200 dark:bg-neutral-900 p-2 justify-between'>
      <Button onClick={() => setShowModal(true)}>Add Item</Button>
      <Button onClick={toggleDarkMode}>
        <img src={darkMode ? LightIcon : DarkIcon} alt='dark/light mode icon' />
      </Button>
    </div>
  );
};

export default TopMenuBar;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className='border-2 border-neutral-400 dark:border-neutral-800 hover:border-transparent hover:bg-neutral-400 hover:dark:bg-neutral-950 rounded-lg p-2'
      onClick={onClick}
    >
      {children}
    </button>
  );
};
