import  React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, Clock, CheckCircle, ArrowLeft, Play, Award } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ReadingModule = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

   // Import reading modules data
  const readingModules = {
    1: {
      title: 'HTML Fundamentals',
      duration: '30 min read',
      content: `
# HTML (HyperText Markup Language)

## Overview

HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.

For comprehensive HTML documentation similar to MDN, please refer to the complete HTML specification and tutorials.

## Basic Structure

Every HTML document has a basic structure:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
\`\`\`

## Common Elements

\`\`\`html
<!-- Headings -->
<h1>Main Heading</h1>
<h2>Subheading</h2>

<!-- Paragraphs -->
<p>This is a paragraph of text.</p>

<!-- Links -->
<a href="https://example.com">External Link</a>

<!-- Images -->
<img src="image.jpg" alt="Description">

<!-- Lists -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
\`\`\`

## External Resources

- [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML Specification](https://www.w3.org/TR/html52/)
- [HTML Validator](https://validator.w3.org/)
      `,
      quiz: [
        {
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Markup Language'],
          correct: 0
        },
        {
          question: 'Which element is used for the largest heading?',
          options: ['<h6>', '<h1>', '<header>', '<heading>'],
          correct: 1
        },
        {
          question: 'What is the correct way to create a link?',
          options: ['<a url="page.html">Link</a>', '<link href="page.html">Link</link>', '<a href="page.html">Link</a>', '<a src="page.html">Link</a>'],
          correct: 2
        }
      ]
    },
    2: {
      title: 'CSS Styling Guide',
      duration: '40 min read',
      content: `
# CSS (Cascading Style Sheets)

## Overview

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML.

## Basic Syntax

\`\`\`css
selector {
    property: value;
}
\`\`\`

## Selectors

\`\`\`css
/* Element selector */
h1 { color: blue; }

/* Class selector */
.highlight { background: yellow; }

/* ID selector */
#header { width: 100%; }
\`\`\`

## External Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
      `,
      quiz: [
        {
          question: 'What does CSS stand for?',
          options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
          correct: 1
        },
        {
          question: 'Which property changes background color?',
          options: ['color', 'background-color', 'bgcolor', 'background'],
          correct: 1
        }
      ]
    },
    3: {
      title: 'Java Fundamentals',
      duration: '45 min read',
           content: `
# Java Programming Language

## Overview

Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA).

## Table of Contents

1. [Language Basics](#language-basics)
2. [Object-Oriented Programming](#object-oriented-programming)
3. [Data Types and Variables](#data-types-and-variables)
4. [Control Flow](#control-flow)
5. [Classes and Objects](#classes-and-objects)
6. [Inheritance](#inheritance)
7. [Interfaces](#interfaces)
8. [Exception Handling](#exception-handling)
9. [Collections Framework](#collections-framework)
10. [Concurrency](#concurrency)

## Language Basics

### History and Philosophy

Java was originally developed by James Gosling at Sun Microsystems and released in 1995. The language derives much of its syntax from C and C++, but has fewer low-level facilities than either of them.

### Key Features

- **Platform Independence**: Write once, run anywhere (WORA)
- **Object-Oriented**: Pure object-oriented programming language
- **Simple**: Easy to learn and use
- **Secure**: Built-in security features
- **Robust**: Strong memory management
- **Multithreaded**: Built-in support for multithreaded programming
- **Interpreted**: Java bytecode is interpreted by JVM
- **High Performance**: Bytecode compilation provides good performance
- **Dynamic**: Supports dynamic loading of classes

## Data Types and Variables

### Primitive Data Types

Java has eight primitive data types:

\`\`\`java
// Integer types
byte byteVar = 127;        // 8-bit signed (-128 to 127)
short shortVar = 32767;    // 16-bit signed (-32,768 to 32,767)
int intVar = 2147483647;   // 32-bit signed (-2^31 to 2^31-1)
long longVar = 9223372036854775807L; // 64-bit signed

// Floating-point types
float floatVar = 3.14f;    // 32-bit IEEE 754
double doubleVar = 3.14159265359; // 64-bit IEEE 754

// Other types
boolean boolVar = true;    // true or false
char charVar = 'A';       // 16-bit Unicode character
\`\`\`

### Variable Declaration

\`\`\`java
// Declaration
int number;

// Declaration with initialization
int count = 0;

// Multiple declarations
int x, y, z;
int a = 1, b = 2, c = 3;

// Constants
final int MAX_SIZE = 100;
\`\`\`

## Control Flow

### Conditional Statements

\`\`\`java
// if-else statement
if (condition) {
    // code block
} else if (anotherCondition) {
    // code block
} else {
    // code block
}

// switch statement
switch (variable) {
    case value1:
        // code block
        break;
    case value2:
        // code block
        break;
    default:
        // default code block
}
\`\`\`

### Loops

\`\`\`java
// for loop
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// enhanced for loop (for-each)
int[] array = {1, 2, 3, 4, 5};
for (int element : array) {
    System.out.println(element);
}

// while loop
while (condition) {
    // code block
}

// do-while loop
do {
    // code block
} while (condition);
\`\`\`

## Object-Oriented Programming

### Classes and Objects

\`\`\`java
public class Person {
    // Instance variables (fields)
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
    
    // toString method
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// Creating objects
Person person1 = new Person("Alice", 25);
Person person2 = new Person("Bob", 30);
\`\`\`

### Inheritance

\`\`\`java
// Superclass
public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
}

// Subclass
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, String breed) {
        super(name);  // Call superclass constructor
        this.breed = breed;
    }
    
    public void bark() {
        System.out.println(name + " is barking");
    }
    
    @Override
    public void eat() {
        System.out.println(name + " the dog is eating dog food");
    }
}
\`\`\`

### Interfaces

\`\`\`java
// Interface definition
public interface Drawable {
    // Abstract method (implicitly public and abstract)
    void draw();
    
    // Default method (Java 8+)
    default void display() {
        System.out.println("Displaying the drawable object");
    }
    
    // Static method (Java 8+)
    static void info() {
        System.out.println("This is a drawable interface");
    }
}

// Interface implementation
public class Circle implements Drawable {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
}
\`\`\`

## Exception Handling

\`\`\`java
// Basic try-catch
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero: " + e.getMessage());
}

// Multiple catch blocks
try {
    // risky code
} catch (IOException e) {
    // handle IO exception
} catch (SQLException e) {
    // handle SQL exception
} catch (Exception e) {
    // handle any other exception
} finally {
    // cleanup code (always executes)
}

// Try-with-resources (Java 7+)
try (FileReader file = new FileReader("file.txt")) {
    // use file
} catch (IOException e) {
    // handle exception
}
// file is automatically closed
\`\`\`

### Custom Exceptions

\`\`\`java
// Custom exception class
public class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

// Using custom exception
public void setAge(int age) throws InvalidAgeException {
    if (age < 0) {
        throw new InvalidAgeException("Age cannot be negative");
    }
    this.age = age;
}
\`\`\`

## Collections Framework

### Common Collections

\`\`\`java
import java.util.*;

// List implementations
List<String> arrayList = new ArrayList<>();
List<String> linkedList = new LinkedList<>();

// Set implementations
Set<String> hashSet = new HashSet<>();
Set<String> treeSet = new TreeSet<>();

// Map implementations
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> treeMap = new TreeMap<>();

// Adding elements
arrayList.add("element1");
hashSet.add("uniqueElement");
hashMap.put("key1", 100);

// Iterating
for (String item : arrayList) {
    System.out.println(item);
}

// Using streams (Java 8+)
arrayList.stream()
    .filter(s -> s.length() > 5)
    .forEach(System.out::println);
\`\`\`

## Concurrency

### Thread Creation

\`\`\`java
// Extending Thread class
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// Implementing Runnable interface
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running: " + Thread.currentThread().getName());
    }
}

// Creating and starting threads
MyThread thread1 = new MyThread();
thread1.start();

Thread thread2 = new Thread(new MyRunnable());
thread2.start();

// Lambda expression (Java 8+)
Thread thread3 = new Thread(() -> {
    System.out.println("Lambda thread running");
});
thread3.start();
\`\`\`

### Synchronization

\`\`\`java
public class Counter {
    private int count = 0;
    
    // Synchronized method
    public synchronized void increment() {
        count++;
    }
    
    // Synchronized block
    public void decrement() {
        synchronized(this) {
            count--;
        }
    }
    
    public int getCount() {
        return count;
    }
}
\`\`\`

## Best Practices

###  Naming Conventions

- Classes: PascalCase (e.g., MyClass, StudentManager)
- Methods and Variables: camelCase (e.g., getName(), studentAge)
- Constants: UPPER_SNAKE_CASE (e.g., MAX_SIZE, DEFAULT_VALUE)  
- Packages: lowercase (e.g., com.example.project)  

### Code Style

\`\`\`java
// Good practices
public class BankAccount {
    private static final double MINIMUM_BALANCE = 0.0;
    private double balance;
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < MINIMUM_BALANCE) {
            throw new IllegalArgumentException("Initial balance cannot be negative");
        }
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    public boolean withdraw(double amount) {
        if (amount <= 0) {
            return false;
        }
        if (balance - amount < MINIMUM_BALANCE) {
            return false;
        }
        balance -= amount;
        return true;
    }
}
\`\`\`

## Common Patterns

### Singleton Pattern

\`\`\`java
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {
        // Private constructor
    }
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
\`\`\`

### Builder Pattern

\`\`\`java
public class Car {
    private String make;
    private String model;
    private int year;
    private String color;
    
    private Car(Builder builder) {
        this.make = builder.make;
        this.model = builder.model;
        this.year = builder.year;
        this.color = builder.color;
    }
    
    public static class Builder {
        private String make;
        private String model;
        private int year;
        private String color;
        
        public Builder make(String make) {
            this.make = make;
            return this;
        }
        
        public Builder model(String model) {
            this.model = model;
            return this;
        }
        
        public Builder year(int year) {
            this.year = year;
            return this;
        }
        
        public Builder color(String color) {
            this.color = color;
            return this;
        }
        
        public Car build() {
            return new Car(this);
        }
    }
}

// Usage
Car car = new Car.Builder()
    .make("Toyota")
    .model("Camry")
    .year(2023)
    .color("Blue")
    .build();
\`\`\`

## Advanced Topics

### Generics

\`\`\`java
// Generic class
public class Box<T> {
    private T content;
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
}

// Generic method
public static <T> void swap(T[] array, int i, int j) {
    T temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// Bounded generics
public class NumberBox<T extends Number> {
    private T number;
    
    public double getDoubleValue() {
        return number.doubleValue();
    }
}
\`\`\`

### Annotations

\`\`\`java
// Built-in annotations
@Override
public String toString() {
    return "Custom toString";
}

@Deprecated
public void oldMethod() {
    // deprecated method
}

@SuppressWarnings("unchecked")
public List getRawList() {
    return new ArrayList();
}

// Custom annotation
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Benchmark {
    String value() default "";
}

@Benchmark("Performance test")
public void myMethod() {
    // method implementation
}
\`\`\`

## Summary

Java is a robust, platform-independent programming language that supports object-oriented programming principles. Its rich feature set includes strong typing, automatic memory management, extensive standard library, and powerful concurrency support.

Key concepts to master:
- Object-oriented programming (classes, inheritance, interfaces)
- Exception handling
- Collections framework
- Multithreading and concurrency
- Generics and annotations
- Design patterns

## External Resources

- [Oracle Java Documentation](https://docs.oracle.com/javase/)
- [Java Language Specification](https://docs.oracle.com/javase/specs/)
- [Effective Java by Joshua Bloch](https://www.oracle.com/technical-resources/articles/java/bloch-effective-08-qa.html)
      `, 
      estimatedTime: 45,
      quiz: [
        {
          question: 'What is the main advantage of Java platform independence?',
          options: [
            'Faster execution speed',
            'Code runs on any platform with JVM',
            'Smaller file sizes',
            'Better graphics support'
          ],
          correct: 1
        },
        {
          question: 'Which keyword is used to inherit from a class in Java?',
          options: ['implements', 'extends', 'inherits', 'derives'],
          correct: 1
        },
        {
          question: 'What is encapsulation in Java?',
          options: [
            'Hiding implementation details',
            'Creating multiple objects',
            'Executing code faster',
            'Managing memory automatically'
          ],
          correct: 0
        }
      ]
    },
       'react-hooks': {
      title: 'React Hooks Documentation',
      duration: '35 min read',
      content: `
# React Hooks

React Hooks are functions that let you "hook into" React state and lifecycle features from function components. Hooks don't work inside classes — they let you use React without classes.

## Table of Contents

1. [Introduction to Hooks](#introduction-to-hooks)
2. [Hook Rules](#hook-rules)
3. [Basic Hooks](#basic-hooks)
4. [Additional Hooks](#additional-hooks)
5. [Custom Hooks](#custom-hooks)
6. [Performance Optimization](#performance-optimization)
7. [Testing Hooks](#testing-hooks)
8. [Migration Guide](#migration-guide)

## Introduction to Hooks

### Motivation

Hooks solve a wide variety of seemingly unconnected problems in React that we've encountered over five years of writing and maintaining tens of thousands of components:

- **It's hard to reuse stateful logic between components**
- **Complex components become hard to understand**
- **Classes confuse both people and machines**

### What is a Hook?

A  Hook is a special function that lets you hook into React features. For example, useState is a Hook that lets you add React state to function components. 

\`\`\`jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Hook Rules

There are two rules for using Hooks:

### 1. Only Call Hooks at the Top Level

Do  not call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. 

\`\`\`jsx
// ❌ Don't do this
function BadExample() {
  if (condition) {
    const [name, setName] = useState(''); // This is wrong!
  }
  // ...
}

// ✅ Do this
function GoodExample() {
  const [name, setName] = useState(''); // This is correct!
  
  if (condition) {
    // Use the Hook result here
  }
  // ...
}
\`\`\`

### 2. Only Call Hooks from React Functions

Do  not call Hooks from regular JavaScript functions. Instead, you can: 

- ✅ Call Hooks from React function components
- ✅ Call Hooks from custom Hooks

## Basic Hooks

### useState

useState  is a Hook that lets you add React state to function components. 

**Syntax:**
\`\`\`jsx
const [state, setState] = useState(initialState);
\`\`\`

**Examples:**

\`\`\`jsx
import React, { useState } from 'react';

// Simple state
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}

// Object state
function Profile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateName = (name) => {
    setUser(prevUser => ({
      ...prevUser,
      name: name
    }));
  };
  
  return (
    <div>
      <input 
        value={user.name} 
        onChange={(e) => updateName(e.target.value)} 
      />
    </div>
  );
}

// Lazy initialization
function ExpensiveComponent() {
  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation();
    return initialState;
  });
  
  return <div>{state}</div>;
}
\`\`\`

### useEffect

The  Effect Hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined. 

**Syntax:**
\`\`\`jsx
useEffect(() => {
  // Side effect code here
  
  return () => {
    // Cleanup code here (optional)
  };
}, [dependencies]); // Dependencies array (optional)
\`\`\`

**Examples:**

\`\`\`jsx
import React, { useState, useEffect } from 'react';

// Effect without cleanup
function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title  = "You clicked " + count + " times"; 
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Effect with cleanup
function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once

  return <div>Count: {count}</div>;
}

// Effect with dependencies
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [userId]); // Effect runs when userId changes

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return <div>Hello, {user.name}!</div>;
}
\`\`\`

### useContext

useContext  accepts a context object and returns the current context value for that context. 

**Syntax:**
\`\`\`jsx
const value = useContext(MyContext);
\`\`\`

**Example:**

\`\`\`jsx
import React, { useContext, createContext } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// Consumer component using useContext
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      I am styled by theme context!
    </button>
  );
}
\`\`\`

## Additional Hooks

### useReducer

An  alternative to useState. Accepts a reducer and returns the current state paired with a dispatch method. 

**Syntax:**
\`\`\`jsx
const [state, dispatch] = useReducer(reducer, initialArg, init);
\`\`\`

**Example:**

\`\`\`jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
    </>
  );
}
\`\`\`

### useCallback

Returns a memoized callback function.

**Syntax:**
\`\`\`jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
\`\`\`

**Example:**

\`\`\`jsx
import React, { useState, useCallback, memo } from 'react';

// Child component that only re-renders when its props change
const ExpensiveChild = memo(({ onClick }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Without useCallback, this function is recreated on every render
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Empty dependency array means it never changes

  return (
    <div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}
\`\`\`

### useMemo

Returns a memoized value.

**Syntax:**
\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

**Example:**

\`\`\`jsx
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const [count, setCount] = useState(0);

  // This expensive calculation only runs when items change
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return (
    <div>
      <p>Expensive calculation result: {expensiveValue}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment count
      </button>
    </div>
  );
}
\`\`\`

### useRef

Returns  a mutable ref object whose .current property is initialized to the passed argument. 

**Syntax:**
\`\`\`jsx
const refContainer = useRef(initialValue);
\`\`\`

**Examples:**

\`\`\`jsx
import React, { useRef, useEffect } from 'react';

// Accessing DOM elements
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  
  const onButtonClick = () => {
    //  current points to the mounted text input element 
    inputEl.current.focus();
  };
  
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}

// Storing mutable values
function Timer() {
  const intervalRef = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => clearInterval(intervalRef.current)}>
        Stop timer
      </button>
    </div>
  );
}
\`\`\`

## Custom Hooks

Custom  Hooks are JavaScript functions whose names start with use and that may call other Hooks. 

**Examples:**

\`\`\`jsx
import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// Using custom hooks
function UserProfile({ userId }) {
  const  { data: user, loading, error } = useFetch("/api/users/" + userId); 
  const [preferences, setPreferences] = useLocalStorage('userPrefs', {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Theme: {preferences.theme || 'default'}</p>
    </div>
  );
}
\`\`\`

## Performance Optimization

### When to Use useCallback and useMemo

-  useCallback: When you need to prevent a function from being recreated on every render
- useMemo: When you need to prevent expensive calculations from running on every render 

### React.memo with Hooks

\`\`\`jsx
import React, { memo, useState, useCallback } from 'react';

const ChildComponent = memo(({ onClick, title }) => {
  console.log('ChildComponent rendered');
  return <button onClick={onClick}>{title}</button>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // This callback is memoized and won't cause re-renders of ChildComponent
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} title="Click me" />
    </div>
  );
}
\`\`\`

## Testing Hooks

### Testing Custom Hooks

\`\`\`jsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
\`\`\`

### Testing Components with Hooks

\`\`\`jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  
  const button = screen.getByText('Increment');
  const counter = screen.getByText(/count:/i);
  
  expect(counter).toHaveTextContent('Count: 0');
  
  fireEvent.click(button);
  
  expect(counter).toHaveTextContent('Count: 1');
});
\`\`\`

## Migration Guide

### From Class Components to Hooks

**Class Component:**
\`\`\`jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title  = "You clicked " + this.state.count + " times"; 
  }

     componentDidUpdate() {
    document.title = "You clicked " + this.state.count + " times";
  } 

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
\`\`\`

**Function Component with Hooks:**
\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

   useEffect(() => {
    document.title = "You clicked " + count + " times";
  }); 

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Best Practices

1. Always  use the ESLint plugin: Install eslint-plugin-react-hooks to catch common mistakes 
2. Separate  concerns: Use multiple useEffect hooks for different concerns 
3. Optimize  dependencies: Only include values that are actually used inside the effect 
4. Use  custom hooks: Extract component logic into custom hooks for reusability 
5. Avoid  premature optimization: Do not use useCallback and useMemo everywhere 

## Common Patterns

### Conditional Effects

\`\`\`jsx
function MyComponent({ shouldFetch, url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (shouldFetch) {
      fetch(url).then(response => response.json()).then(setData);
    }
  }, [shouldFetch, url]);

  return <div>{data ? JSON.stringify(data) : 'No data'}</div>;
}
\`\`\`

### Cleanup Effects

\`\`\`jsx
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    
    return () => {
      connection.disconnect();
    };
  }, [roomId]);

  return <div>Connected to {roomId}</div>;
}
\`\`\`

## Summary

React Hooks provide a powerful way to use state and other React features in function components. They allow you to:

- Use state without writing a class
- Share stateful logic between components  
- Split one component into smaller functions based on related pieces
- Use React features like context, refs, and lifecycle methods in function components

The most important things to remember:
- Follow the Rules of Hooks
- Use the ESLint plugin to catch mistakes
- Create custom hooks to share logic
- Use \`useEffect\` for side effects
- Optimize performance with \`useCallback\` and \`useMemo\` when needed

## External Resources

- [React Hooks Official Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
- [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
      `, 
      estimatedTime: 35,
      quiz: [
        {
          question: 'What was the main motivation behind introducing React Hooks?',
          options: [
            'To replace class components entirely',
            'To enable state and lifecycle in functional components',
            'To improve performance only',
            'To reduce bundle size'
          ],
          correct: 1
        },
        {
          question: 'Which hook would you use for expensive calculations that should only run when dependencies change?',
          options: ['useEffect', 'useState', 'useMemo', 'useCallback'],
          correct: 2
        },
        {
          question: 'What is the second argument to useEffect used for?',
          options: [
            'Error handling',
            'Cleanup function',
            'Dependency array',
            'Return value'
          ],
          correct: 2
        }
      ]
    }
  };

  useEffect(() => {
    const moduleData = readingModules[moduleId];
    if (moduleData) {
      setModule(moduleData);
    }

    // Track reading time
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [moduleId]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!module) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Module Not Found</h1>
          <Link to="/learn" className="text-blue-400 hover:text-blue-300">
            ← Back to Learning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="fixed top-20 left-0 right-0 h-1 bg-gray-800 z-40">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Header */}
        <div className="glassmorphism p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link 
                to="/learn" 
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">{module.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-blue-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Book className="w-4 h-4" />
                    <span>Reading Module</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatTime(timeSpent)}</div>
                <div className="text-xs text-blue-300">Time Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{Math.round(readingProgress)}%</div>
                <div className="text-xs text-blue-300">Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="glassmorphism p-8 rounded-2xl mb-8">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-4xl font-bold text-white mb-6">{children}</h1>,
                h2: ({ children }) => <h2 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                p: ({ children }) => <p className="text-blue-200 mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="text-blue-200 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="text-blue-200 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="ml-4">{children}</li>,
                code: ({ inline, children }) => inline ? 
                  <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm">{children}</code> :
                  <code className="block bg-gray-900 text-cyan-400 p-4 rounded-lg text-sm overflow-x-auto">{children}</code>,
                pre: ({ children }) => <pre className="bg-gray-900 rounded-lg mb-4 overflow-x-auto">{children}</pre>
              }}
            >
              {module.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Quiz Section */}
        {readingProgress >= 80 && (
          <div className="glassmorphism p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Module Quiz</h3>
              </div>
              <div className="text-sm text-blue-300">
                Complete to earn 50 XP
              </div>
            </div>
            
            {!showQuiz ? (
              <div className="text-center">
                <p className="text-blue-200 mb-6">
                  Great job reading through the module! Test your understanding with a quick quiz.
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all mx-auto"
                >
                  <Play className="w-5 h-5" />
                  <span>Start Quiz</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {module.quiz.map((question, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className="flex items-center space-x-3 p-2 rounded hover:bg-white/5 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            className="text-blue-500"
                          />
                          <span className="text-blue-200">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all">
                    Submit Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingModule;
 