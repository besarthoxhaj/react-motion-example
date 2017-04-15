import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionMotion, spring, presets } from 'react-motion';

class Demo extends React.Component {

  constructor() {
    super();
    this.state = {
      list:[
        {key:'00',data:{title:'00'}},
        {key:'01',data:{title:'01'}},
      ]
    };
  };

  render() {
    return (
      <div className='container'>
        {this.state.list.map(elm => {
          return (
            <div
              key={elm.key}
              className='square'
            >{elm.data.title}</div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.querySelector('#content'));
