import React, { Component } from 'react';

class Form extends Component {
  redner() {
    return (
      <a-form>
        <a-switch position="0.2 2.1 0" enabled="true"></a-switch>
        <a-radio position="0.2 1.8 0" width="3" name="food" label="Ice cream" value="icecream"></a-radio>
        <a-checkbox position="0.2 1.5 0" width="3" name="stuff" label="I am a checkbox" checked="true"></a-checkbox>
        <a-checkbox position="0.2 1.2 0" width="3" name="stuff" label="And I am another one" checked="true" disabled="true"></a-checkbox>
        <a-button position="0.2 0.8 0" name="stuff" value="Click me" type="raised"></a-button>
        <a-button position="0.2 0.35 0" width="3" name="stuff" value="You can now click me" disabled="false"></a-button>
      </a-form>
    )
  }
}

export default Form