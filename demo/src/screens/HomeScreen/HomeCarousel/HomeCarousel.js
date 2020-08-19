import React, {useEffect} from 'react';
import {Carousel, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import slideOne from '../../../images/slide_one.jpg';
import slideTwo from '../../../images/slide_two.jpg';
import slideThree from '../../../images/slide_three.jpg';
import {event} from '../../../lib/measure.js';
import {CodeModal} from '../../../components/CodeModal/CodeModal.js';
import {getItemParameters, getEventCodeSnippet} from '../../../utils.js';
import './HomeCarousel.css';

/**
 * Creates slideshow component for showcasing our latest deals and offerings.
 * @return {!JSX}
 */
export function HomeCarousel() {
  const viewPromotionParameters = {
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
  };

  // Send view_promotion event when the carousel loads for the first time.
  useEffect(() => {
    event('view_promotion', viewPromotionParameters);
  });

  const carouselCodeModal =
      <CodeModal
        popupId="view_promotion"
        gtagCode={
          getEventCodeSnippet('view_promotion', viewPromotionParameters)
        }
        measureCode={
          getEventCodeSnippet('view_promotion', viewPromotionParameters, 'measure')
        }
      />;

  /**
   * Collects a single promotional item's standard parameters and
   * returns it as an object with items attribute mapped to
   * the items array containing a single promotional item.
   * @param {string} itemId
   * @param {number=} discount Price discount of item (if any)
   * @return {{items: Array<!ItemParameters>}} An object containing
   *     an items attibute mapped to an array of {@link ItemParameters}
   */
  function getSelectPromotionParameters(itemId, discount = 0) {
    return {
      items: [
        {
          ...getItemParameters(itemId),
          promotion_name: 'Home Carousel',
          // if discount is positive, include it in the item parameter
          ...(discount > 0 ? {discount} : {}),
        },
      ],
    };
  }

  /**
   * Send select_promotion event to Google Analytics when a carousel
   * slide promotional item is selected.
   * @param {string} itemId
   * @param {number=} discount Price discount of item (if any)
   */
  function onSlideClick(itemId, discount = 0) {
    event('select_promotion', getSelectPromotionParameters(itemId, discount));
  }

  /**
   * Creates a select_promotion event code modal with code snippets
   * for gtag and measure libraries.
   * @param {string} itemId
   * @param {number=} discount Price discount of item (if any)
   * @return {!JSX} Code snippet of the event.
   */
  function getSelectPromotionCodeModal(itemId, discount = 0) {
    return (
      <CodeModal
        popupId="view_promotion"
        gtagCode={
          getEventCodeSnippet(
              'select_promotion',
              getSelectPromotionParameters(itemId, discount),
          )
        }
        measureCode={
          getEventCodeSnippet(
              'select_promotion',
              getSelectPromotionParameters(itemId, discount),
              'measure'
          )
        }
      />
    );
  }

  // Using multiple Carousel items causes an warning: findDOMNode is deprecated
  // in StrictMode. findDOMNode was passed an instance of Transition ...
  // This is bootstrap's fault it should be fixed eventually.
  // https://github.com/react-bootstrap/react-bootstrap/issues/5075
  return (
    <Carousel>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideOne}
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="header-with-modal carousel-header">
            <h3>
              {`Stunning High Quality Prints Available`}
              {carouselCodeModal}
            </h3>
          </div>
          <div className="header-with-modal carousel-text">
            <p>{`View our `}
              <Link
                onClick={() => {
                  onSlideClick('7ba94');
                }}
                to="/product/7ba94"
              >
                {`latest piece`}
              </Link>
            </p>
            {getSelectPromotionCodeModal('7ba94')}
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideTwo}
          alt="Second slide"
        />
        <Carousel.Caption>
          <div className="header-with-modal carousel-header">
            <h3>
              {`SALE!`}
            </h3>
            {carouselCodeModal}
          </div>
          <div className="header-with-modal carousel-text">
            <p>{`Get this classic 50% off. `}
              <Link
                onClick={() => {
                  onSlideClick('hjdf7', 50);
                }}
                to="/product/hjdf7"
              >
                {`View Deal`}
              </Link>
            </p>
            {getSelectPromotionCodeModal('hjdf7', 50)}
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src={slideThree}
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className="header-with-modal carousel-header">
            <h3 className="font-italic">
              {`Toe Beans`}
            </h3>
            {carouselCodeModal}
          </div>
          <div className="header-with-modal carousel-text">
            <p>
              {`Seen like never before. `}
              <Link
                onClick={() => {
                  onSlideClick('3h488');
                }}
                to="/product/3h488"
              >
                {`Buy Now`}
              </Link>
            </p>
            {getSelectPromotionCodeModal('3h488')}
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
