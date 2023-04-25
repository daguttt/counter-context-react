import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import './App.css';

type ContextStateType<S> = [S, Dispatch<SetStateAction<S>>] | null;

const CounterContext = createContext<ContextStateType<number>>(null);

type CounterContextProviderProps = {
  children: ReactNode;
};

function CounterContextProvider({ children }: CounterContextProviderProps) {
  return (
    <CounterContext.Provider value={useState(0)}>
      {children}
    </CounterContext.Provider>
  );
}

const useCounterContext = () => {
  const context = useContext(CounterContext);

  if (context === null)
    throw new Error('useCounterContext must be in CounterContextProvider');

  return context;
};

function Counter() {
  const [counter] = useCounterContext();
  return <p>Counter: {counter}</p>;
}

function AddCounter() {
  const [, setCounter] = useCounterContext();
  return (
    <button onClick={() => setCounter((prev) => prev + 1)}>Add One</button>
  );
}

function App() {
  return (
    <CounterContextProvider>
      <Counter />
      <AddCounter />
    </CounterContextProvider>
  );
}

export default App;
