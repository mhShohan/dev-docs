# React TypeScript

## Table of Contents

1. [Props Types](#define-props-types)
2. [useState](#usestate)
3. [useReducer](#example-of-using-usereducer-hook)
4. [useContext](#usecontext)
5. [useRef](#useref)
6. [Generic Props](#generic-props)
7. [Template Literals Type](#template-literals-type)
8. [Polymorphic Component](#polymorphic-component)

# Define Props types

- Add Props Types

  ```ts
  type TSkill = {
    title: string;
    id: number;
  };

  type TPersonProps = {
    name: string;
    age: number;
    skills: TSkill[];
    isActive: boolean;
    address: {
      city: string;
      country: string;
    };
  };

  type TStatusProps = {
    status: 'LOADING' | 'SUCCESS' | 'FAILED';
  };

  const Person = ({ name, age, skills, isActive, address }: TPersonProps) => {
    return (
      <div>
        <h1>Hello, {name}! </h1>
      </div>
    );
  };

  export default Person;
  ```

- Import Component with props

  ```ts
  import Person from './components/Person';

  const person1 = {
    name: 'shohan',
    age: 23,
    skills: [
      { id: 1, title: 'js' },
      { id: 2, title: 'ts' },
    ],
    isActive: true,
    address: {
      city: 'pabna',
      country: 'bd',
    },
  };

  const App = () => {
    return (
      <div className='app'>
        <Person {...person1} />
      </div>
    );
  };

  export default App;
  ```

- Another Props Example

  ```ts
  type HeadingProps = {
    children: React.ReactNode;
  };

  const Heading = (props: HeadingProps) => {
    return <div>{props.children}</div>;
  };

  export const Typography = ({ children }: { children: string }) => {
    return <h1>{children}</h1>;
  };

  export default Heading;
  ```

- Event Props

  ```ts
  // Button Event
  type BtnProps = {
    children: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };

  const Button = ({ handleClick, children }: BtnProps) => {
    return <button onClick={(event) => handleClick(event)}>{children}</button>;
  };

  export default Button;

  // Input Event
  type InputProps = {
    value: string;
    placeholder: string;
    type: 'text' | 'email' | 'number';
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const Input = ({ handleChange, value, type, placeholder }: InputProps) => {
    return <input onChange={handleChange} value={value} type={type} placeholder={placeholder} />;
  };
  ```

- Style Props

  ```ts
  type StyleProps = {
    styles: React.CSSProperties;
  };
  ```

# useState

- Type Infer - Automatic infer the type,

  ```ts
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [active, isActive] = useState(true);
  ```

- Types for future value

  ```ts
  type TStateTypes = {
    name: string;
    email: string;
  };

  const [user, setUser] = useState<TStateTypes | null>(null);
  ```

- Type Assertion

  ```ts
  type TStateTypes = {
    name: string;
    email: string;
  };

  const [user, setUser] = useState<StateType>({} as StateTypes);
  ```

# Example of using useReducer hook

```ts
import { useReducer } from 'react';

type InitialState = {
  counter: number;
};

// with load type
type UpdateAction = {
  type: 'INC' | 'DEC';
  payload: number;
};

// without payload types
type ResetAction = {
  type: 'RESET';
};

type CounterAction = UpdateAction | ResetAction;

const initialState = { counter: 0 };

const reducer = (state: InitialState, action: CounterAction) => {
  switch (action.type) {
    case 'INC':
      return { counter: state.counter + action.payload };
    case 'DEC':
      return { counter: state.counter - action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>{state.counter}</h1>
      <button onClick={() => dispatch({ type: 'INC', payload: 1 })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DEC', payload: 1 })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

# useContext

- ```ts
  import React, { createContext } from 'react';

  const theme = {
    primary: {
      bg: 'green',
      color: 'white',
    },
    secondary: {
      bg: 'red',
      color: 'black',
    },
  };

  type ThemeProviderProps = {
    children: React.ReactNode;
  };

  export const ThemeContext = createContext(theme);

  export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
  };
  ```

- Example 2

  ```ts
  import React, { createContext, useState } from 'react';

  type User = {
    name: string;
    email: string;
  };

  type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  };
  export const UserContext = createContext({} as UserContextType);

  type UserProviderProps = {
    children: React.ReactNode;
  };
  export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
  };
  ```

# useRef

```ts
import { useEffect, useRef } from 'react';

const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <input type='text' ref={inputRef} />
    </div>
  );
};

export default DomRef;
```

# Generic props

```ts
type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

const List = <T extends { id: string }>({ items, onClick }: ListProps<T>) => {
  return (
    <div>
      <h2>List of Items</h2>
      {items.map((item) => (
        <div key={item.id} onClick={() => onClick(item)}>
          {item.id}
        </div>
      ))}
    </div>
  );
};

export default List;
```

# Template Literals Type

```ts
type HorizontalType = 'left' | 'center' | 'right';
type VerticalType = 'top' | 'center' | 'bottom';

type PositionProps = {
  position: `${HorizontalType}-${VerticalType}`;
};
```

# Polymorphic Component

```ts
type TypographyOwnProps<E extends React.ElementType> = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
  as?: E;
};

type TypographyProps<E extends React.ElementType> = TypographyOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TypographyOwnProps<E>>;

const Typography = <E extends React.ElementType = 'div'>({
  size,
  color,
  children,
  as,
}: TypographyProps<E>) => {
  const Component = as || 'div';
  return <Component className={`${size}-${color}`}>{children}</Component>;
};

export default Typography;
```
