import React, {useEffect} from 'react';
import {Carousel, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import slideOne from '../../../images/slide_one.jpg';
import slideTwo from '../../../images/slide_two.jpg';
import slideThree from '../../../images/slide_three.jpg';
import {event} from '../../../lib/gtag.js';
import {getItemParameters} from '../../../utils.js';
import './HomeCarousel.css';

/**
 * Creates slideshow component for showcasing our latest deals and offerings.
 * @return {!JSX}
 */
export function HomeCarousel() {
  // Send view_promotion event when the carousel loads for the first time.
  useEffect(() => {
    event('view_promotion', {
      items: [
        {
          ...getItemParameters('7ba94'),
          promotion_name: 'Home Carousel',
        },
        {
          ...getItemParameters('hjdf7'),
          promotion_name: 'Home Carousel',
          discount: 25,
        },
        {
          ...getItemParameters('3h488'),
          promotion_name: 'Home Carousel',
        },
      ],
      promotion_name: 'Home Carousel',
    });
  }, []);

  /**
   * Send select_promotion event to Google Analytics when a carousel
   * slide promotional item is selected.
   * @param {string} itemId
   * @param {number=} discount Price discount of item (if any)
   */
  function onSlideClick(itemId, discount = 0) {
    event('select_promotion', {
      items: [
        {
          ...getItemParameters(itemId),
          promotion_name: 'Home Carousel',
          // if discount is positive, include it in the item parameter
          ...(discount > 0 && {discount}),
        },
      ],
    });
  }

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
            <Link
              onClick={() => {
                onSlideClick('7ba94');
              }}
              to="/product/7ba94"
            >
              latest piece
            </Link>.
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
            <Link
              onClick={() => {
                onSlideClick('hjdf7', 25);
              }}
              to="/product/hjdf7"
            >
              View Deal
            </Link>
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
            <Link
              onClick={() => {
                onSlideClick('3h488');
              }}
              to="/product/3h488"
            >
              Buy Now
            </Link>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
