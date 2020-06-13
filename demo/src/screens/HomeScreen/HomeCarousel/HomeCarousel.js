import React from 'react';
import {Carousel, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import slideOne from '../../../images/slide_one.png';
import slideTwo from '../../../images/slide_two.png';
import slideThree from '../../../images/slide_three.png';
import './HomeCarousel.css';

/**
 * Creates slideshow component for showcasing our latest deals and offerings.
 * @return {!JSX} The component.
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
          <p>{`View our `}
            <Link to="/product/7ba94">latest piece</Link>.
          </p>
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
          <p>{`Get this classic 50% off. `}
            <Link to="/product/hjdf7">View Deal</Link>
          </p>
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
          <p>{`Seen like never before. `}
            <Link to="/product/3h488">Buy Now</Link>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
