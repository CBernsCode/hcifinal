import React, { Component } from 'react'
import AceEditor from 'react-ace'
import PSDisplay from './Display'
import PSCurvedImg from './CurvedImg'
import PSText from './Text'
import { Form, Select } from 'react-form';
import { Glyphicon } from 'react-bootstrap'
import 'brace/mode/json'
import 'brace/theme/github'
import firebase, { auth, provider } from '../containers/firebase.js';

export default class Editor extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      enviroment: "",
      autoReload: false
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        if (this.state.autoReload) {
          let renderFun = this.props.actions.refresh
          const itemsRef = firebase.database().ref(this.state.user.uid);
          itemsRef.on('value', (snapshot) => {
            let val = snapshot.val()
            if (val) {
              renderFun(val)
            }
          })
        }
      }
    });
  }
  logout = () => {
    auth.signOut().then(() => {
      this.setState({ user: null });
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
  sync = () => {
    this.setState({ autoReload: !this.state.autoReload })
    if (!this.state.autoReload && this.state.user) {
      let renderFun = this.props.actions.refresh
      firebase.database().ref(this.state.user.uid).once('value')
        .then(function (snapshot) { renderFun(snapshot.val()) })
      console.log("works")
    }
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
        <PSDisplay render={this.props.actions.render} />
        <PSCurvedImg render={this.props.actions.render} />
        <PSText render={this.props.actions.render} />
      </div>
    )
  }
  enviromentChange = (formApi) => {
    var el = document.getElementById('env')
    // To-Do: refactor out
    el.setAttribute('environment', formApi.values.enviroment)
    el.setAttribute('position', '0 -1 0')
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
    return (
      <div id="editor" className="col-lg-4">
        <div className="btn-group btn-group-justified" role="group">
          <div className="btn-group" >
            <button onClick={this.handleSave} type="button" className="btn btn-primary">
              <Glyphicon glyph="floppy-open" /> Upload </button>
          </div>
          <div className="btn-group" >
            <button onClick={this.sync} type="button" className={"btn btn-primary " + (this.state.autoReload ? "active" : "")}>
              <Glyphicon glyph="refresh" /> Sync</button>
          </div>
          <div className="btn-group" >
            {this.state.user
              ? <button className="btn btn-primary" onClick={this.logout}>
                <img width={20} height={18} src={this.state.user.photoURL} alt="thumbnail" />  Log Out
                </button>
              : <button className="btn btn-primary" onClick={this.login}>
                <Glyphicon glyph="user" /> Log In</button>
            }
          </div>
        </div>
        <AceEditor
          ref="aceEditor"
          width="100%"
          mode="json"
          theme="github"
          value={this.props.text}
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