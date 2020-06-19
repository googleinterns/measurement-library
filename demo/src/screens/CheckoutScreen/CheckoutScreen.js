import React, {useEffect, useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {UserInfoForm} from '../../components/UserInfoForm/UserInfoForm.js';
import {useHistory} from 'react-router-dom';
import './CheckoutScreen.css';
import '../NavButton.css';
import {MiniCart} from '../../components/MiniCart/MiniCart.js';
import {CodeModal} from '../../components/CodeModal/CodeModal.js';
import {BillingInfoForm} from '../../components/BillingInfoForm/BillingInfoForm.js';
import {getAddPaymentInfoCodeSnippet, getAddShippingInfoCodeSnippet, getPurchaseCodeSnippet} from '../../lib/gtagSnippets.js';
import {sendAddPaymentInfoEvent, sendAddShippingInfoEvent, sendBeginCheckoutEvent, sendPurchaseEvent} from '../../lib/gtagEvents';
import {getMeasureCodeSnippet} from '../../utils';
import {getBeginCheckoutCodeSnippet} from '../../lib/gtagSnippets';

/**
 * The ID for the personal info form the user will fill out on this page.
 * @const {string}
 */
const USER_FORM_ID = 'user-info-form';

/**
 * The ID for the billing info form the user will fill out on this page.
 * @const {string}
 */
const BILLING_FORM_ID = 'billing-info-form';

/**
 * Page component for a user to enter in personal billing information
 * and confirm the items in their cart.
 * @return {!JSX}
 */
export function CheckoutScreen() {
  const [shippingDone, setShippingDone] = useState(false);
  const /** !Object */ history = useHistory();

  // begin checkout on first page load only
  useEffect(sendBeginCheckoutEvent, []);

  /**
   * If the personal information the user has put in is valid,
   * display the billing information form.
   * Otherwise, alert the user that their form is invalid.
   */
  function continueIfPersonalValid() {
    const form = document.getElementById(USER_FORM_ID);
    if (form.checkValidity()) {
      sendAddShippingInfoEvent();
      setShippingDone(true);
    } else {
      form.reportValidity();
    }
  }

  /**
   * Navigate to the thank you page iff the user info form and
   * billing forms are valid.
   * Otherwise, alert the user of invalid form fields
   */
  function navIfFormValid() {
    const formPersonal = document.getElementById(USER_FORM_ID);
    const formBilling = document.getElementById(BILLING_FORM_ID);
    if (formBilling.checkValidity() && formPersonal.checkValidity()) {
      sendAddPaymentInfoEvent();
      sendPurchaseEvent();
      // navigate to thank you page with react-router
      history.push('/thanks');
    } else {
      formPersonal.reportValidity();
      formBilling.reportValidity();
    }
  }

  const submitUserInfoButton =
  <div className='button-like' onClick={continueIfPersonalValid}>
    Continue
    <CodeModal popupId={'addShipping'}
      gtagCode={getAddShippingInfoCodeSnippet()}
      measureCode={getMeasureCodeSnippet()}/>
  </div>;

  const billingForm = (<>
    <BillingInfoForm formId={BILLING_FORM_ID}/>
    <div className='button-like' onClick={navIfFormValid}>
      {'Confirm Order '}
      <CodeModal popupId={'addPayment'}
        gtagCode={getAddPaymentInfoCodeSnippet()}
        measureCode={getMeasureCodeSnippet()}/>
      <CodeModal popupId={'purchase'}
        gtagCode={getPurchaseCodeSnippet()}
        measureCode={getMeasureCodeSnippet()}/>
    </div>
  </>);

  return (
    <Container>
      <Row className='checkout-header'>
        <Col xs={12} md={6}>
          <CodeModal popupId={'begin_checkout'}
            gtagCode={getBeginCheckoutCodeSnippet()}
            measureCode={getMeasureCodeSnippet()}/>
          {' Billing Details'}</Col>
        <Col xs={12} md={6} className='hide-medium-or-smaller'>Your order
        </Col>
      </Row>
      <Row className='checkout-content'>
        <Col xs={12} md={6}>
          <UserInfoForm formId={USER_FORM_ID}/>
        </Col>
        <Col xs={12} className='hide-medium-or-bigger checkout-header'>
          Your order
        </Col>
        <Col xs={12} md={6}>
          <MiniCart/>
          {shippingDone ? billingForm : submitUserInfoButton}
        </Col>
      </Row>
    </Container>
  );
}
