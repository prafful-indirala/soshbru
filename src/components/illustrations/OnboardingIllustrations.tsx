import React from 'react';
import { StyleSheet } from 'react-native';
import { Circle, G, Path, Svg } from 'react-native-svg';

export const CafeIllustration = () => (
  <Svg width="300" height="300" viewBox="0 0 300 300" fill="none">
    <G>
      {/* Building */}
      <Path
        d="M60 100h180v150H60z"
        fill="#f3f4f6"
        stroke="#4b5563"
        strokeWidth="2"
      />
      {/* Window */}
      <Path
        d="M90 130h60v80H90z"
        fill="#e5e7eb"
        stroke="#4b5563"
        strokeWidth="2"
      />
      {/* Door */}
      <Path
        d="M180 170h40v80h-40z"
        fill="#d1d5db"
        stroke="#4b5563"
        strokeWidth="2"
      />
      {/* Coffee Cup */}
      <Path
        d="M120 220c0-11 9-20 20-20h20c11 0 20 9 20 20"
        stroke="#4b5563"
        strokeWidth="2"
        fill="#fbbf24"
      />
      <Path d="M110 220h80" stroke="#4b5563" strokeWidth="2" />
    </G>
  </Svg>
);

export const NetworkingIllustration = () => (
  <Svg width="300" height="300" viewBox="0 0 300 300" fill="none">
    <G>
      {/* People Circles */}
      <Circle cx="100" cy="150" r="30" fill="#60a5fa" />
      <Circle cx="200" cy="150" r="30" fill="#34d399" />
      {/* Connection Line */}
      <Path
        d="M130 150h40"
        stroke="#4b5563"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      {/* Chat Bubbles */}
      <Path
        d="M80 120c0-11 9-20 20-20h40c11 0 20 9 20 20v30l-10 10H90c-11 0-20-9-20-20v-20z"
        fill="#f3f4f6"
        stroke="#4b5563"
        strokeWidth="2"
      />
      <Path
        d="M160 180c0-11 9-20 20-20h40c11 0 20 9 20 20v30l-10 10h-60c-11 0-20-9-20-20v-20z"
        fill="#f3f4f6"
        stroke="#4b5563"
        strokeWidth="2"
      />
    </G>
  </Svg>
);

export const GrowthIllustration = () => (
  <Svg width="300" height="300" viewBox="0 0 300 300" fill="none">
    <G>
      {/* Growth Chart */}
      <Path d="M60 250h180M60 250V70" stroke="#4b5563" strokeWidth="2" />
      {/* Chart Lines */}
      <Path
        d="M60 250l40-40 40-20 40-60 40-30"
        stroke="#34d399"
        strokeWidth="3"
        fill="none"
      />
      {/* Dots */}
      <Circle cx="100" cy="210" r="5" fill="#34d399" />
      <Circle cx="140" cy="190" r="5" fill="#34d399" />
      <Circle cx="180" cy="130" r="5" fill="#34d399" />
      <Circle cx="220" cy="100" r="5" fill="#34d399" />
      {/* Coffee Cup Icon */}
      <Path
        d="M160 180c0-11 9-20 20-20h20c11 0 20 9 20 20"
        stroke="#4b5563"
        strokeWidth="2"
        fill="#fbbf24"
      />
      <Path d="M150 180h80" stroke="#4b5563" strokeWidth="2" />
    </G>
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '100%',
    maxWidth: 300,
  },
});
