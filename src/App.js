import React, { Component } from 'react';
import NoteForm from "./components/noteForm";

class App extends Component {
 
  //push a note object onto the array
  //pass the function to the component via props
  //need to bind the function to the component

  render() {
    return (
      <div className="App">
          <NoteForm />     
      </div>
    );
  }
}

export default App;
