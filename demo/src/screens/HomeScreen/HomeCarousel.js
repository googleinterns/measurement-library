import React from 'react';
import {Carousel, Image} from 'react-bootstrap';
import slideOne from '../../images/slide_one.png';
import slideTwo from '../../images/slide_two.png';
import slideThree from '../../images/slide_three.png';
import './HomeCarousel.css';

/**
 * @return {!JSX} Slideshow component for showcasing
 *     our latest deals and offerings.
 */
export function HomeCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Stunning High Quality Prints Available</h3>
          <p>View our <a href="/product/123">latest piece</a>.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideTwo}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>SALE!</h3>
          <p>Get this classic 50% off. <a href="/product/123">View Deal</a></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideThree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3 className="font-italic">Toe Beans</h3>
          <p>Seen like never before. <a href="/product/123">Buy Now</a></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
