import React from 'react';

export function App() {

  const sayHello = () => {
    return 'Hello!';
  }

  return (
    <div> // simple HTML tags

      // call JS func in HTML
      <span>{sayHello()}</span>

    </div>
  )
}