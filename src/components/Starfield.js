import React, { Component } from 'react';

const randRange = (min, max) => Math.random() * (max - min) + min;

class Starfield extends Component {
  renderStars() {
    const { stars = 0.75 } = this.props;
    const starElements = [];

    for (let i = 0; i < stars; i++) {
      const x = randRange(0, 100);
      const y = randRange(0, 100);
      const radius = 0.1;
      const animationDuration = randRange(2, 10);

      starElements.push(
        <circle
          key={i}
          fill="#fff"
          cx={`${x}%`}
          cy={`${y}%`}
          r={`${radius}%`}
          style={{
            animation: `twinkle ${animationDuration}s ease-in-out infinite`,
          }}
        />
      );
    }

    return starElements;
  }

  render() {
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', position: "absolute", zIndex: 2 }}
        preserveAspectRatio="none"
      >
        {this.renderStars()}
      </svg>
    );
  }
}

export default Starfield;
