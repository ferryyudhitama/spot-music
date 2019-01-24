import React, { Component } from 'react';

class App extends Component {
  state = {
    number: 0,
    update: true
  }

  componentWillMount () {
    console.log('Component WILL MOUNT')
  }

  componentDidMount () {
    console.log('Component DID MOUNT!')
  }

  componentWillReceiveProps (newProps) {
    console.log('Component WILL RECIEVE PROPS!')
  }

  shouldComponentUpdate (newProps, newState) {
    console.log('Component should UPDATE!');
    /*
     if this method return false
     component will not updated
    */
    if (newState.update) {
      console.log('TRUE');
      return true;
    } else {
      console.log('FALSE');
      return false;
    }
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('Component WILL UPDATE!');
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('Component DID UPDATE!')
  }

  componentWillUnmount () {
    console.log('Component WILL UNMOUNT!')
  }

  increment () {
    this.setState({number: this.state.number + 1, update: true})
  }

  dontUpdate () {
    this.setState({number: this.state.number + 1, update: false})
  }

  render() {
    console.log('RENDER Component!')
    return (
     <div>
      <h3>{this.state.number}</h3>
      <button onClick={this.increment.bind(this)}>Increment, component will update!</button>
      &nbsp;
      <button onClick={this.dontUpdate.bind(this)}>Increment, but component will not update!</button>
     </div>
    );
  }
}

export default App;