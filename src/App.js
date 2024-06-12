import './App.css';
import Counter from './Counter/Counter.tsx';
import PhoneInput from './Stripe/PhoneInput.tsx';
// import DebouncedInput from './DebouncedInput.tsx';
// import Pagination from './Pagination.tsx';
// import ThemeSwitchFC from './ThemeSwitchFC.tsx';
// import ToDoList from './ToDoList';
// import ThemeSwitch from './ThemeSwitch.jsx';

// TODO: input with throttle
// TODO: window resize with throttle
function App() {
  return (
    <div className="App">
     {/* <ToDoList /> */}
     {/* <ThemeSwitch /> */}
     {/* <Pagination /> */}
      {/* <SearchInput /> */}
      {/* <ThemeSwitchFC /> */}
      {/* <DebouncedInput /> */}
      {/* <Counter /> */}
      <PhoneInput />
    </div>
  );
}

export default App;
