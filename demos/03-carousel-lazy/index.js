import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

const KEYCODES = {
  LEFT: 37,
  RIGHT: 39,
};

const COLORS = [
  '#15B371',
  '#DB3737',
  '#FF7373',
  '#F29D49',
  '#669EFF',
  '#29A634',
  '#C274C2',
  '#30404D',
  '#9E2B0E',
  '#A82A2A',
  '#10161A',
];

const getColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const randomString = (length) => {
  const chars = '01236789abcdefghijkltuvwxyzABNOPQRWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

class Demo extends React.Component {

  constructor() {
    super();
    this.state = {
      list: [
        this.getElement(),
        this.getElement(),
        this.getElement(),
      ],
      current: 0,
      animate: true,
    };

    this.handleKeydown = this.handleKeydown.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.getElement = this.getElement.bind(this);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  };

  render() {
    return (
      <div className='container'>
        <Motion style={this.getStyle(this.state.animate)}>
          {({x}) => {
            return (
              <div style={{position: 'absolute', width: 5 * 150, left: -(x)}}>
                {React.Children.toArray(this.state.list)}
              </div>
            );
          }}
        </Motion>
      </div>
    );
  };

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.RIGHT) {
      if(this.state.current === 2) {
        this.setState({
          current: this.state.current - 1,
          list: this.state.list.slice(1),
          animate: false,
        });
      }
      this.setState({
        current: this.state.current + 1,
        list: this.state.list.concat(this.getElement()),
        animate: true,
      });
      return;
    }

    if (e.keyCode === KEYCODES.LEFT) {
      if(this.state.current === 2) {
        this.setState({
          current: this.state.current + 1,
          list: this.state.list.slice(0,-1),
          animate: false,
        });
      }
      this.setState({
        current: this.state.current - 1,
        list: [this.getElement()].concat(this.state.list),
        animate: true,
      });
      return;
    }
  };

  getStyle(animate) {

    const current = this.state.current;

    return {
      x: animate ? spring(current * 150) : current * 150
    };
  };

  getElement() {
    return (
      <div
        key={randomString(10)}
        className='square'
        style={{backgroundColor: getColor()}}
      ></div>
    );
  };
}

ReactDOM.render(<Demo />, document.querySelector('#content'));
