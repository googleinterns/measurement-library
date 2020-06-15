import React from 'react';

import {HomeCarousel} from './HomeCarousel/HomeCarousel.js';
import {HomeProducts} from './HomeProducts/HomeProducts.js';

/**
 *  Creates page component for the home page where a user can view deals
 *     in a site carousel or see all products offered.
 * @return {!JSX}
 */
export function HomeScreen() {
  return (
    <div>
      <HomeCarousel />
      <HomeProducts />
    </div>
  );
}
