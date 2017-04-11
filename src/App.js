import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import * as R from 'ramda';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [
        {key: 'a'},
        {key: 'b'},
      ]
    };
    this.getDefaultStyles = this.getDefaultStyles.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.addOne = this.addOne.bind(this);
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        items: [
          {key: 'a'},
        ]
      });
    },1000);
  };

  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={this.getStyles()}
      >
        {interpolatedStyles => {
          return (
            <div style={{display:'flex'}}>
              {interpolatedStyles.map(config => {
                return (
                  <div
                    onClick={this.addOne}
                    key={config.key}
                    style={{
                      ...config.style,
                      backgroundColor:'red',
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
    this.setState({
      items: R.prepend({
        key:Math.floor(Math.random() * 1000)
      }, this.state.items)
    });
  };

  getStyles() {
    const {items} = this.state;
    return items.map(elm => {
      return {
        ...elm,
        style: {
          margin: spring(5),
          height: 100,
          width: spring(100),
          opacity: 1,
        }
      };
    });
  };

  getDefaultStyles() {
    const {items} = this.state;
    return items.map(elm => {
      return {
        ...elm,
        style: {
          margin:spring(5),
          height:100,
          width:spring(100),
          opacity:spring(1),
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

  willEnter() {
    return {
      width: 0,
      height: 0,
      margin: 0,
      opacity: 0,
    };
  };
}

export default App;
