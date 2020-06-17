import React from 'react';
import {Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {makeFormGroup} from '../UserInfoForm/UserInfoForm.js';

const /** !JSX */ cardType = makeFormGroup(/** label= */ 'Credit Card Type',
    /** control= */ <Form.Control as="select" custom>
      <option>Mastercard</option>
      <option>Visa</option>
      <option>American Express</option>
      <option>Discover</option>
    </Form.Control>,
);

const /** !JSX */ cardNumber = makeFormGroup(/** label= */ 'Credit Card Type',
    /** control= */ <Form.Control type='number' required
      defaultValue='4111111111111111'
      placeholder='Credit Card Number (required)'
    />,
);

const /** !JSX */ zipAndCode = <Form.Row>
  {makeFormGroup(/** label= */'Security Code',
      /** control= */ <Form.Control type='number' required
        defaultValue='111'
        placeholder='Security Code (required)'
      />, /** useWholeRow= */ false)}
  {makeFormGroup(/** label= */ 'Zip Code',
      /** control= */ <Form.Control
        type='number'
        defaultValue='19123'
        placeholder='Zip (optional)'
      />, /** useWholeRow= */ false)}
</Form.Row>;

/**
 * Creates a page component with a form to get billing information.
 * @return {!JSX} The component.
 */
export function BillingInfoForm({formId}) {
  return (
    <Form id={formId}>
      {cardType}
      {cardNumber}
      {zipAndCode}
    </Form>
  );
}

BillingInfoForm.propTypes = {
  formId: PropTypes.string,
};
