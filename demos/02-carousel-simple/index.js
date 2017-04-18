import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

const KEYCODES = {
  LEFT: 37,
  RIGHT: 39,
};

class Demo extends React.Component {

  constructor() {
    super();
    this.state = {
      list: [
        {key:'01', data:'#15B371'},
        {key:'02', data:'#DB3737'},
        {key:'03', data:'#FF7373'},
        {key:'04', data:'#F29D49'},
        {key:'05', data:'#669EFF'},
        {key:'06', data:'#29A634'},
        {key:'07', data:'#C274C2'},
      ],
      current: 0,
    };

    this.handleKeydown = this.handleKeydown.bind(this);
    this.getStyle = this.getStyle.bind(this);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  render() {
    return (
      <div className='container'>
        <Motion style={this.getStyle()}>
          {({x}) => {
            return (
              <div
                style={{
                  position: 'absolute',
                  width: this.state.list.length * 150,
                  left: -(x)
                }}
              >
                {this.state.list.map(({key, data}) => (
                  <div key={key} className='square' style={{backgroundColor:data}}></div>
                ))}
              </div>
            );
          }}
        </Motion>
      </div>
    );
  };

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.LEFT) {
      this.setState({
        current: this.state.current - 1
      });
    }

    if (e.keyCode === KEYCODES.RIGHT) {
      this.setState({
        current: this.state.current + 1
      });
    }
  };

  getStyle() {
    return {
      x: spring(this.state.current * 150)
    };
  }
}

ReactDOM.render(<Demo />, document.querySelector('#content'));
