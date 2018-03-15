import React, { Component } from 'react'
import AceEditor from 'react-ace'
import Display from './Display'
import CurvedImg from './CurvedImg'

import 'brace/mode/json'
import 'brace/theme/github'

export default class Editor extends Component {
  remove = () => {
    this.props.actions.clear()
  }
  handleSave = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.refresh(content)
    this.setState({ text: content })
  }
  buttons = () => {
    return (
      <div className="btn-group pull-left" role="group" aria-label="...">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-success" onClick={this.handleSave}>Render Scene</button>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default">Generate Random</button>
        </div>
        <div className="btn-group" role="group" onClick={this.remove}>
          <button type="button" className="btn btn-danger"> Clear Scene</button>
        </div>
      </div>
    )
  }

  render() {
    let text = this.props.text
    return (
      <div id="editor" className="col-lg-4">
        <AceEditor
          ref="aceEditor"
          width="100%"
          mode="json"
          theme="github"
          value={text}
          name="ace-editor"
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          wrapEnabled={true}
        />
        <Display render={this.props.actions.render} />
        <CurvedImg render={this.props.actions.render} />
        {this.buttons()}
      </div>
    );
  }
}