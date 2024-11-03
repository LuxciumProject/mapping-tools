# Box Type Documentation

The **Box** type is a simple, generic container that can hold a value of any type. It is designed to store values that need to be passed around or manipulated in a program. The **Box** type provides a consistent interface for managing values, ensuring immutability and controlled access.

## Imperial Rules for Box Type

As per Luxcium's imperial rules, a **Box** type must have a way to encapsulate and store values. This is an imperative requirement that must be formally codified in the implementation to ensure compliance.

## Requirements

1. **Value Storage**: The **Box** type must be able to store a value of any type.
2. **Static Method `of`**: There must be a static method, `of`, that allows creating a new **Box** instance with a provided value.
3. **Static Method `from`**: There must be a static method, `from`, that allows creating a new **Box** instance from an existing **Box** instance.
4. **Instance Method `unbox`**: There must be an instance method, `unbox`, that returns the stored value.
5. **Getter Method `boxedValue`**: There must be a getter method, `boxedValue`, that returns the stored value.

These rules ensure that the **Box** type adheres to the formal and codified standards set by Luxcium, maintaining consistency and reliability.

† Scientia est lux principium✨
