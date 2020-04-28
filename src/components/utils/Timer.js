import React from 'react';
import './Timer.css';

// Timer code is pulled from an old codepen I wrote a while ago.
// Pomodoro Timer https://codepen.io/paalpwmd/pen/yLNKqYP
// It works - but it is a class based component, which isn't in line with the rest of the project.
// This should be refactored to use a functional component.
// Eventually, the audio should be hosted locally.
// There should be a more intuitive timer interface

class Timer extends React.Component {
  intervalID = 0;
  constructor(props) {
    super(props);
    this.state = {
      timerLength: 0,
      length: 1500000,
      clockFace: '',
      timerOn: false,
      currentAction: 'Session',
    };
  }

  reset = () => {
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    this.setState(
      {
        break: 300000,
        length: 1500000,
        timerLength: '',
        timerOn: false,
      },
      this.clockify
    );
    clearInterval(this.intervalID);
  };

  sessionInc = () => {
    if (this.state.length < 3600000) {
      this.setState(
        {
          length: this.state.length + 60000,
        },
        this.clockify
      );
    }
  };

  sessionDec = () => {
    if (this.state.length > 60000) {
      this.setState(
        {
          length: this.state.length - 60000,
        },
        this.clockify
      );
    }
  };

  switchLabel = (x) => {
    if (x === 'Session') {
      return 'Break';
    } else if (x === 'Break') {
      return 'Session';
    }
  };

  toggleTimer = (x) => {
    if (x === 'Break') {
      return this.state.timerLength;
    } else {
      return this.state.break;
    }
  };

  tick = () => {
    this.intervalID = setInterval(() => {
      if (this.state.length > 0) {
        this.setState({
          length: this.state.length - 1000,
        });
        this.clockify();
      } else if (this.state.length === 0) {
        document.getElementById('beep').play();
        this.setState(
          {
            length: this.toggleTimer(this.state.currentAction),
          },
          this.clockify
        );
      }
    }, 1000);
  };

  playAudio = () => {
    document.getElementById('beep').play();
  };
  clockify = () => {
    let minutes;
    //Convert ms to mins
    minutes = Math.floor(this.state.length / 60000);

    if (minutes.toString().length === 1) {
      minutes = '0' + minutes.toString();
    }
    let seconds = (this.state.length % 60000) / 1000;
    if (seconds.toString().length === 1) {
      seconds = '0' + seconds.toString();
    }
    this.setState({
      clockFace: `${minutes}:${seconds}`,
    });
  };

  timer = () => {
    if (this.state.timerOn === false) {
      this.tick();
      this.setState({
        timerOn: true,
        timerLength: this.state.length,
      });
    } else {
      clearInterval(this.intervalID);
      this.setState({
        timerOn: false,
      });
    }
  };

  componentDidMount() {
    this.clockify();
  }

  render() {
    return (
      <div id='timer'>
        <div id='session'>
          <div id='time-left'>{this.state.clockFace}</div>
        </div>
        <div id='controls'>
          <div class='button' id='reset' onClick={this.reset}>
            Reset
          </div>
          <div class='button' id='start_stop' onClick={this.timer}>
            Timer
          </div>
          <div>
            <div id='sessioncontainer'>
              <div id='session-label'>
                <div id='session-increment' onClick={this.sessionInc}>
                  {' '}
                  +{' '}
                </div>
                <p id='session-length'>
                  {this.state.timerLength / 60000 || this.state.length / 60000}
                </p>
                <div id='session-decrement' onClick={this.sessionDec}>
                  {' '}
                  -{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
        <audio
          id='beep'
          preload='auto'
          src='http://soundfxcenter.com/video-games/the-legend-of-zelda/8d82b5_The_Legend_of_Zelda_Secret_Sound_Effect.mp3'
        />
      </div>
    );
  }
}

export default Timer;
