import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {key: 'a'},
        {key: 'b'},
        {key: 'c'},
        {key: 'd'},
        {key: 'e'},
        {key: 'f'},
        {key: 'g'},
      ]
    };
    this.getStyles = this.getStyles.bind(this);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [
          {key: 'a'},
          {key: 'c'},
          {key: 'd'},
          {key: 'g'},
        ]
      });
    },500);
  };

  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        styles={this.getStyles()}
      >
        {interpolatedStyles => {
          console.log('interpolatedStyles',interpolatedStyles);
          return (
            <div onClick={this.addOne} style={{display:'flex'}}>
              {interpolatedStyles.map(config => {
                return (
                  <div
                    key={config.key}
                    style={{
                      ...config.style,
                      backgroundColor: 'red',
                    }}
                  >{config.key}</div>
                );
              })}
            </div>
          );
        }}
      </TransitionMotion>
    );
  };

  addOne() {
    
  };

  getStyles() {
    const {items} = this.state;
    return items.map(elm => {
      return {
        ...elm,
        style: {
          margin:5,
          height:100,
          width:100,
          backgroundColor:'red',
          opacity:1,
        }
      };
    });
  };

  willLeave() {
    return {
      width: spring(0),
      height: 100,
      margin: spring(0),
      opacity: spring(0),
    };
  };
}

export default App;
