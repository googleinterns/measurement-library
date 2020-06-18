import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {UserInfoForm} from '../../components/UserInfoForm/UserInfoForm.js';
import {useHistory} from 'react-router-dom';
import './CheckoutScreen.css';
import '../NavButton.css';
import {MiniCart} from '../../components/MiniCart/MiniCart.js';
import {CodeModal} from '../../components/CodeModal/CodeModal';

/**
 * The ID for the form the user will fill out on this page.
 * @const {string}
 */
const FORM_ID = 'user-info-form';

/**
 * Page component for a user to enter in personal billing information
 * and confirm the items in their cart.
 * @return {!JSX}
 */
export function CheckoutScreen() {
  const /** !Object */ history = useHistory();

  /**
   * Navigate to the thank you page iff the user info form is valid.
   * Otherwise, alert the user that the form is invalid.
   */
  function navIfFormValid() {
    const form = document.getElementById(FORM_ID);
    if (form.checkValidity()) {
      // navigate to thank you page with react-router
      history.push('/thanks');
    } else {
      form.reportValidity();
    }
  }

  return (
    <Container>
      <Row className='checkout-header'>
        <Col xs={12} md={6}>Billing Details</Col>
        <Col xs={12} md={6} className='hide-medium-or-smaller'>Your order</Col>
      </Row>
      <Row className='checkout-content'>
        <Col xs={12} md={6}>
          <UserInfoForm formId={FORM_ID}/>
        </Col>
        <Col xs={12} className='hide-medium-or-bigger checkout-header'>
          Your order
        </Col>
        <Col xs={12} md={6}>
          <MiniCart/>
          <div onClick={navIfFormValid} className='button-like'>
            {'Submit Order '}
            <CodeModal popupId={'purchase'}
              gtagCode={`gtag('event', \n ... \n)`}
              measureCode={`tag('event', \n purchase... \n)`}/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
