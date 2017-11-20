hh# react-simple-dob
React Based Simple DOB component without Calendar 

## How To Use
```
import React, { Component } from 'react';
import SimpleDob from 'simple-dob';

class App extends Component {

    onDOBSubmit = function(e, obj){
        console.log(obj.dob);
        // Wed Dec 25 1985 00:00:00 GMT+0530 (IST)
    }
    render() {
	    return (
	      <div className="App">
		<header className="App-header">
		  <img src={logo} className="App-logo" alt="logo" />
		  <h1 className="App-title">Welcome to React</h1>
		</header>
		<p className="App-intro">
		  To get started, edit <code>src/App.js</code> and save to reload.
		</p>
		Simple Dob: <br/>
		<br/>
		<SimpleDob errorMessage = "Please enter valid dob value" onChange = {this.onDOBSubmit.bind(this)}/>
	      </div>
	    );
    }
}

export default App;
```
