import React, {useState, useEffect} from 'react';
import {Modal, Tabs, Tab} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './CodeModal.css';
import Prism from 'prismjs';
import {GoQuestion} from 'react-icons/go';
import 'prismjs/themes/prism.css';

CodeModal.propTypes = {
  popupId: PropTypes.string,
  measureCode: PropTypes.string,
  gtagCode: PropTypes.string,
};

/**
 * A popup to display the google analytics code that fires on
 * a button click.
 * @param {string} popupId The ID of this popup.
 * @param {string} measureCode The code for this open source library.
 * @param {string} gtagCode The code for gtag.
 * @return {!JSX} The component.
 */
export function CodeModal({popupId, measureCode, gtagCode}) {
  const [showing, setShowing] = useState(false);

  // Highlight the code in the modal after the page renders.
  useEffect(()=> {
    Prism.highlightAll();
  });

  const modal = <Modal show={showing} onHide={()=>setShowing(false)}>
    <Tabs defaultActiveKey='measure' id={popupId}>
      <Tab eventKey='measure' title='measure.js'>
        <pre>
          <code className='language-javascript'>
            {measureCode}
          </code>
        </pre>
      </Tab>
      <Tab eventKey='gtag' title='gtag.js'>
        <pre>
          <code className='language-javascript'>
            {gtagCode}
          </code>
        </pre>
      </Tab>
    </Tabs>
  </Modal>;

  return (<span className="clickable-box" onClick=
    /**
      * Not the same as setShowing(true). setShowing(true) would
      * call when the modal is showing and override attempts to close it, as
      * once the modal is up, anywhere you click fires this event.
      */
    {()=> {
      if (!showing) setShowing(true);
    }}>
    <GoQuestion size={16}/>
    {modal}
  </span>);
}
