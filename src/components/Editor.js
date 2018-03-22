import React, { Component } from 'react'
import AceEditor from 'react-ace'
import Display from './Display'
import CurvedImg from './CurvedImg'
import { Form, Select } from 'react-form';
import 'brace/mode/json'
import 'brace/theme/github'
import firebase, { auth, provider } from '../containers/firebase.js';

export default class Editor extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      enviroment: "",
      autoReload: true
    }
  }
  componentDidMount() {
    this.setState({ text: this.props.text });
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        if (this.state.autoReload) {
          let renderFun = this.props.actions.refresh
          const itemsRef = firebase.database().ref(this.state.user.uid);
          itemsRef.on('value', (snapshot) => {
            renderFun(snapshot.val())
          })
        }
      }
    });
  }
  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({ user });
    });
  }
  handleSave = (e) => {
    e.preventDefault();
    const content = this.refs.aceEditor.editor.session.getValue()
    if (this.state.user) {
      const itemRef = firebase.database().ref(this.state.user.uid);
      itemRef.set(content)
    }
    this.props.actions.refresh(content)
  }
  loadScene = () => {
    let renderFun = this.props.actions.refresh
    if (this.state.user) {
      firebase.database().ref(this.state.user.uid).once('value')
        .then(function (snapshot) { renderFun(snapshot.val()) })
    }
  }
  lockScene = () => {
    this.setState({ autoReload: !this.state.autoReload })
  }
  remove = () => {
    this.props.actions.clear()
  }
  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue()
    this.props.actions.refresh(content)
  }
  botButtons = () => {
    return (
      <div className="btn-group btn-group-justified" role="group">
        <div className="btn-group" >
          <button onClick={this.handleRender} type="button" className="btn btn-success" >Render Scene</button>
        </div>
        <div className="btn-group" >
          <button onClick={this.remove} type="button" className="btn btn-danger"> Clear Scene</button>
        </div>
        <Display render={this.props.actions.render} />
        <CurvedImg render={this.props.actions.render} />
      </div>
    )
  }
  enviromentChange = (formApi) => {
    var el = document.getElementById('env')
    el.setAttribute('environment', formApi.values.enviroment)
    el.setAttribute('position' , '0 -1 0')
  }
  enviroment() {
    const enviromentOptions = [
      {
        label: 'Forest',
        value: 'preset: forest',
      },
      {
        label: 'Default',
        value: 'preset: checkerboard',
      },
      {
        label: 'Tron',
        value: 'preset: tron',
      },
      {
        label: 'Starry',
        value: 'preset: starry',
      },
    ]
    return (
      <div className="col-xs-6" >
        <Form>
          {formApi => (
            <form onBlur={() => this.enviromentChange(formApi)}
              id="select-input-form">
              <label className="col-xs-2 control-label" htmlFor="select-input-enviroment">Enviroment:</label>
              <Select className="col-xs-4 form-control" field="enviroment" options={enviromentOptions} />
            </form>
          )}
        </Form>
      </div >
    )
  }

  render() {
    let text = this.props.text
    return (
      <div id="editor" className="col-lg-4">
        <div className="btn-group btn-group-justified" role="group">
          <div className="btn-group" >
            <button onClick={this.handleSave} type="button" className="btn btn-primary">Save</button>
          </div>
          <div className="btn-group" >
            <button onClick={this.loadScene} type="button" className="btn btn-primary">Load</button>
          </div>
          <div className="btn-group" >
            <button onClick={this.lockScene} type="button"
              className={"btn btn-primary " + (this.state.autoReload ? "active" : "")}>Lock</button>
          </div>
          <div className="btn-group" >
            {this.state.user ? <button className="btn btn-primary" onClick={this.logout}>Log Out</button>
              : <button className="btn btn-primary" onClick={this.login}>Log In</button>
            }
          </div>
        </div>
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
        {this.botButtons()}
        {this.enviroment()}
      </div >
    );
  }
}