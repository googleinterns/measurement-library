import React from 'react';
import {GoQuestion} from 'react-icons/go';
import './AboutScreen.css';

const /** JSX */ DESCRIPTION = <p>{'This page is a sample ecommerce ' +
'application with a complete implementation of '}
<a href={'https://support.google.com/analytics/answer/6014841'}>
  {'Enhanced Ecommerce.'}</a>
{' Use this demo to understand how the Enhanced ' +
  'Ecommerce code works, and what is required to implement it on your own ' +
  'site. Every action in this demo comes with code samples showing ' +
  'exactly how the feature is implemented. To view code associated with ' +
  'a button press, click the '}<GoQuestion size={16}/>
{' icon next to the button. This will bring up code samples for both the '}
<a href={'https://developers.google.com/gtagjs'}>{'gtag.js '}</a>
{'library and the measure library. ' +
  'In addition to showing sample code, this site sends real data to Google ' +
  'Analytics. To inspect the hits, just open up the developer ' +
  'tools or use the '}
<a
  href={'https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna'}>
  {'Google Analytics Debugger. '}</a>
{'The full code for this site can be found in the demo folder of the '}
<a href={'https://github.com/googleinterns/measurement-library'}>
  {'github for the measure library. '}</a>
{'If you are not a developer, but are simply interested in purchasing ' +
'prints of the cat Poe, we regret to inform you that, as this is just a demo ' +
'site, you will need to find another website selling pictures of Poe.'}
</p>;

/**
 * @return {!JSX} Page component where describe our website.
 */
export function AboutScreen() {
  return (
    <div className={'about-container'}>
      <h1>{`About this site`}</h1>
      {DESCRIPTION}
    </div>
  );
}
