import React, { Component } from 'react';


//this component will be used to display the notes
class Notes extends Component {
  constructor(props){
    super(props);

    //this works the next way:
      // we passed form the parent component (noteForm) the property item
      //which is set on the <Note /> component inside the render
      // we now get that data (that is in itself the data from the firebase database)
      //and we set that data as the state of this component
      //the property set was named "item", so we look for that inside the "props"

    this.state = {
      note: props.item
    }
  
  }

  //return a div with the content of the note
  //to be able to get the id easily if you need it
  //add the id to the id attribute here
  //since the events will be made on this "child"
  render() {
    
      return (
        <div>
          <div>{this.state.note.content}</div>
        </div>     
      )
    }
  }
  
  export default Notes;
  