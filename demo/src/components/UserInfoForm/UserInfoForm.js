import React from 'react';
import {Form, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

/*
 * A template command to generate a basic text input form group.
 * @param {string} label The label to display above the form.
 * @param {!Form.Control} control The control element of the form.
 * @param {boolean} [useWholeRow=true] If this element is displayed on a
 *      column by itself.
 * @returns {!JSX} A form group with the given label and control.
 */
const makeFormGroup = (label, control, useWholeRow=true) => {
  return (
    <Form.Group as={useWholeRow ? 'div' : Col}>
      <Form.Label>{label}</Form.Label>
      {control}
    </Form.Group>);
};

const /** !JSX */ userInformation = (
  <Form.Row>
    {makeFormGroup(/** label= */'First Name',
        /** control= */ <Form.Control required
          type='text'
          defaultValue='Edgar'
          placeholder='First Name (Required)'
        />, /** useWholeRow= */ false)}
    {makeFormGroup(/** label= */ 'Last Name',
        /** control= */ <Form.Control required
          type='text'
          placeholder='Last Name (Required)'
        />, /** useWholeRow= */ false)}
  </Form.Row>
);
const /** !JSX */ companyName = makeFormGroup(/** label= */ 'Company Name',
    /** control= */ <Form.Control
      type='text'
      placeholder='Company name (optional)'
    />);
const /** !JSX */ addressLine1 = makeFormGroup(
    /** label= */ 'Street Address Line 1',
    /** control= */ <Form.Control required
      type='text'
      defaultValue='532 N. 7th Street'
      placeholder='Address Line 1 (required)'
    />);
const /** !JSX */ addressLine2 = makeFormGroup(
    /** label= */ 'Street Address Line 2',
    /** control= */ <Form.Control
      type='text'
      placeholder='Address Line 2 (optional)'
    />);
const /** !JSX */ regionalInfo = (
  <Form.Row>
    {makeFormGroup(/** label= */'City',
        /** control= */ <Form.Control
          type='text'
          defaultValue='Philadelphia'
          placeholder='City (optional)'
        />, /** useWholeRow= */ false)}
    {makeFormGroup(/** label= */ 'State',
        /** control= */ <Form.Control
          type='text'
          defaultValue='PA'
          placeholder='State (optional)'
        />, /** useWholeRow= */ false)}
  </Form.Row>
);
const /** !JSX */ countryAndZip = <Form.Row>
  {makeFormGroup(/** label= */'Country',
      /** control= */ <Form.Control required
        type='text'
        defaultValue='USA'
        placeholder='Country (required)'
      />, /** useWholeRow= */ false)}
  {makeFormGroup(/** label= */ 'Zip Code',
      /** control= */ <Form.Control
        type='number'
        defaultValue='19123'
        placeholder='Zip (optional)'
      />, /** useWholeRow= */ false)}
</Form.Row>;
const /** !JSX */ email = makeFormGroup(/** label= */'Email',
    /** control= */ <Form.Control
      type = 'email'
      defaultValue='PoeTheCatLover@google.com'
      placeholder='Email (optional)'
    />);

/**
 * Creates a page component with a form to get user information.
 * @return {!JSX} The component.
 */
export function UserInfoForm({formId}) {
  return (
    <Form id={formId}>
      {userInformation}
      {companyName}
      {addressLine1}
      {addressLine2}
      {regionalInfo}
      {countryAndZip}
      {email}
    </Form>
  );
}

UserInfoForm.propTypes = {
  formId: PropTypes.string,
};
