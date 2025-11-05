# `Box<T>`: The Iconic Box Class in Luxcium’s Paradigm

The `Box<T>` class is the foundational element in Luxcium's paradigm for encapsulating values with strict control over instantiation, access, and inheritance. This document provides a comprehensive overview of the `Box<T>` class, detailing its structure, member ordering, and the conventions that govern its implementation.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Class Definition](#class-definition)
3. [Member Ordering and Conventions](#member-ordering-and-conventions)
   - [Fields (Attributes)](#fields-attributes)
   - [Static Members](#static-members)
   - [Constructor](#constructor)
   - [Instance Members](#instance-members)
   - [Getters and Setters](#getters-and-setters)
4. [Detailed Member Descriptions](#detailed-member-descriptions)
   - [Private Field: `_value`](#private-field-_value)
   - [Static Methods](#static-methods)
     - [`of` Method](#of-method)
     - [`from` Method](#from-method)
   - [Protected Constructor](#protected-constructor)
   - [Instance Method: `unbox`](#instance-method-unbox)
   - [Getter: `boxedValue`](#getter-boxedvalue)
5. [Usage Examples](#usage-examples)
6. [Design Principles and Rules](#design-principles-and-rules)
   - [No Public Fields](#no-public-fields)
   - [Mandatory Access Modifiers](#mandatory-access-modifiers)
   - [Factory Methods for Instantiation](#factory-methods-for-instantiation)
   - [Immutability](#immutability)
7. [Extending `Box<T>`](#extending-boxt)
8. [Conclusion](#conclusion)

---

## Introduction

The `Box<T>` class is the most iconic representation of a container in Luxcium's paradigm. It serves as the base class for more complex box implementations, providing a consistent and controlled way to encapsulate values of any type `T`.

This document adheres to the strictest rules in Markdown creation, ensuring compatibility with aggressive linters and maintaining high standards of documentation quality.

---

## Class Definition

```typescript
export abstract class Box<T> {
  // Fields - private members at the top
  private readonly _value: T;

  // Static members - methods closest to the constructor
  public static of<TVal>(value: TVal): Box<TVal> {
    return new ConcreteBox(value);
  }

  public static from<TVal>(box: Box<TVal>): Box<TVal> {
    return Box.of(box.unbox());
  }

  // Constructor - protected to prevent direct instantiation
  protected constructor(value: T) {
    this._value = value;
  }

  // Instance methods - directly after the constructor
  public unbox(): T {
    return this.boxedValue;
  }

  // Getters - following instance methods
  public get boxedValue(): T {
    return this._value;
  }
}

// Concrete implementation to allow instantiation via factory methods
class ConcreteBox<T> extends Box<T> {
  protected constructor(value: T) {
    super(value);
  }
}
```

---

## Member Ordering and Conventions

The `Box<T>` class strictly follows Luxcium's conventions for member ordering and access modifiers. This ensures consistency, readability, and maintainability across all implementations.

### Fields (Attributes)

- **Order**: Private fields at the top, followed by protected, then public fields (although public fields are discouraged).
- **Access Modifiers**: All fields must explicitly specify their access modifiers (`private`, `protected`, or `public`).

### Static Members

- **Placement**: Static members are declared above the constructor.
- **Order**:
  - Static methods (closest to the constructor)
  - Static getters
  - Pairs of static getters and setters (with getters first)
  - Standalone static setters

### Constructor

- **Placement**: The constructor is placed after static members.
- **Access Modifier**: The constructor is `protected` to prevent external instantiation.

### Instance Members

- **Placement**: Instance members are declared after the constructor.
- **Order**:
  - Instance methods (closest to the constructor)
  - Getters
  - Pairs of getters and setters (getters first)
  - Standalone setters

### Getters and Setters

- **Ordering within Getters and Setters**:
  - Getters without setters are placed before pairs of getters and setters.
  - Pairs of getters and setters are grouped together (getter first).
  - Standalone setters without getters are placed after the paired getters and setters.

---

## Detailed Member Descriptions

### Private Field: `_value`

- **Type**: `T`
- **Access Modifier**: `private`, `readonly`
- **Description**: Holds the encapsulated value. It is assigned once via the constructor and cannot be modified thereafter.

### Static Methods

#### `of` Method

- **Signature**: `public static of<TVal>(value: TVal): Box<TVal>`
- **Description**: Factory method to create a new `Box` instance containing the provided `value`.
- **Usage**: Enforces controlled instantiation through a static method rather than direct constructor calls.

#### `from` Method

- **Signature**: `public static from<TVal>(box: Box<TVal>): Box<TVal>`
- **Description**: Creates a new `Box` by unboxing the provided `box` and boxing the extracted value in a new `Box`.
- **Usage**: Allows for the creation of new boxes from existing ones.

### Protected Constructor

- **Signature**: `protected constructor(value: T)`
- **Description**: Initializes the `_value` field with the provided `value`.
- **Access Control**: Being `protected`, it prevents instantiation of `Box` from outside the class hierarchy.

### Instance Method: `unbox`

- **Signature**: `public unbox(): T`
- **Description**: Returns the encapsulated value by accessing the `boxedValue` getter.
- **Usage**: Provides controlled access to the value inside the box.

### Getter: `boxedValue`

- **Signature**: `public get boxedValue(): T`
- **Description**: Allows read-only access to the encapsulated value.
- **Usage**: Offers a way to inspect the value without unboxing it.

---

## Usage Examples

```typescript
// Creating a Box
const numberBox = Box.of(42);
```

```typescript
// Accessing the Boxed Value
console.log(numberBox.boxedValue); // Outputs: 42
```

```typescript
// Unboxing the Value
const unboxedValue = numberBox.unbox();
console.log(unboxedValue); // Outputs: 42
```

```typescript
// Creating a Box from Another Box
const anotherBox = Box.from(numberBox);
console.log(anotherBox.boxedValue); // Outputs: 42
```

---

## Design Principles and Rules

### No Public Fields

- **Rule**: The `Box<T>` class should not have any public fields.
- **Reason**: All access to internal data should be controlled through methods and getters to maintain encapsulation.

### Mandatory Access Modifiers

- **Rule**: All class members must explicitly declare their access modifiers (`private`, `protected`, `public`).
- **Reason**: Ensures clarity of member accessibility and enforces encapsulation.

### Factory Methods for Instantiation

- **Rule**: Instances of `Box<T>` must be created using the static factory methods `of` and `from`.
- **Reason**: The `protected` constructor prevents direct instantiation, enforcing controlled creation of instances.

### Immutability

- **Rule**: The encapsulated value `_value` is `readonly` and cannot be modified after construction.
- **Reason**: Preserves the integrity of the boxed value and ensures predictable behavior.

---

## Extending `Box<T>`

Since `Box<T>` is an abstract class, it is intended to be extended by more complex boxes. Here's an example of extending `Box<T>`:

```typescript
export class AdvancedBox<T> extends Box<T> {
  // Additional fields or methods can be added here

  protected constructor(value: T) {
    super(value);
  }

  // Static factory methods for AdvancedBox
  public static of<TVal>(value: TVal): AdvancedBox<TVal> {
    return new AdvancedBox(value);
  }
}
```

---

## Conclusion

The `Box<T>` class embodies the core principles of Luxcium's paradigm, providing a strict and controlled way to encapsulate values. By adhering to the detailed member ordering, access modifiers, and design rules outlined in this document, developers can ensure consistency and maintainability across all implementations.

This document has been crafted following the strictest Markdown standards to ensure compatibility with aggressive linters and to serve as a comprehensive reference for the `Box<T>` class.
