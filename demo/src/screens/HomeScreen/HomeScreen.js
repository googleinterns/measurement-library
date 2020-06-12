import React from 'react';
import {HomeCarousel} from './HomeCarousel.js';

/**
 * @return {!JSX} Page component for where a user can view deals
 *     in a site carousel or see all products offered.
 */
export function HomeScreen() {
  return (
    <div>
      <HomeCarousel />
      <h1>{`I'm the Home Page!`}</h1>
    </div>
  );
}
