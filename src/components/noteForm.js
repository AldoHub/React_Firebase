import React, { Component } from 'react';

import Notes from "./notes"; 

//import the firebase database
import {DB_CONFIG} from "../config";
//import the firebase module
import firebase from "firebase";


class NoteForm extends Component {
  constructor(props){
    super(props);
   
    this.state ={
      notes:[],
      content: ""
    }

    //init the firebase connection
    this.app = firebase.initializeApp(DB_CONFIG);
    //get the reference to the database
    this.db = this.app.database().ref().child("notes");

    //bind the state of the component
    //so react knows when to set the state
    this.handleInput= this.handleInput.bind(this);
    this.removeNote= this.removeNote.bind(this)
  }

  componentDidMount(){
    
    //get the state of the notes property
    const prevNotes = this.state.notes;

    //-----------GET SNAPSHOT
  
    //get the database info
    //when adding a child to the firebase database
    this.db.on("child_added", snap =>{
      prevNotes.push({
        id: snap.key, // get the id
        content: snap.val().content // get the content property
      })

    //set the state
      this.setState({
        notes: prevNotes
      });

      console.log(this.state.notes)
    });

    
    //------------UPDATE SNAPSHOT
    
    //update the state when the element is deleted from the database
    this.db.on("child_removed", snap => {
       //loop through the array of notes, which is equal
       //to the state 
       for(let i = 0; i < prevNotes.length; i++){
          //if theres an item inside the array
          //that matches the snapshot id sent on the removal
          //then splice it from the displayed array  
          if(prevNotes[i].id === snap.key){
            prevNotes.splice(i, 1);
          }
       } 

       //update the state
       //for the changes to be seen by the user
       this.setState({
         notes:prevNotes
       });

    });
  


  }

  
  //set the state of the component when the user types something
  handleInput(e){
    //this allows the input to display the data  
    console.log(e.target.value);   
    this.setState({
      content: e.target.value
    })
  }



  //remove note
  removeNote(e){
    //get the id of the note
    //when clicking on the "x"
    let noteToDelete = e.target.id;
    console.log(noteToDelete);
    this.db.child(noteToDelete).remove();
  }

  onSubmit(e){
    e.preventDefault();

    if(this.refs.note.value != ""){
      //get the reference of the input
      const noteContent ={ 
        content: this.refs.note.value
      }
      console.log(noteContent);
      //make the push to the database
      this.db.push().set({
        content: noteContent.content 
      });
      //clear the input state
      this.setState({
        content: ""
      });
 
    }else {
      alert("The input is empty, please write a note");
    }
    
  }

  render() {
      return (
        <div>
            <form id="form" onSubmit={this.onSubmit.bind(this)} className="note-form">
                <div className="form-input">
                <input onChange={this.handleInput} type="text" ref="note" name="note" id="note" placeholder="Add a note"
                 value={this.state.content}/>
                <input  type="submit" value="Add Note"/>
                </div>
            </form>
        
            <h3>My Notes:</h3>
            <div className="notes-data">
            <p id="message">{this.state.message}</p>
              {this.state.notes.map((note, i)=>{
                return(
                                
                    <div className="note-item" key={note.id}>
                    <span  onClick={this.removeNote} className="delete" id={note.id}>X</span>
                    <Notes item={note}/>  
                    </div>
                 
                )
              })}

            </div>

        </div>
      );
    }
  }
  
  export default NoteForm;
  