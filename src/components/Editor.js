import React, {Component} from 'react';
import AceEditor from 'react-ace';
import PSPlane from './Display';
import PSCurvedImg from './CurvedImg';
import PSText from './Text';
import PSButton from './Button';
import {Glyphicon} from 'react-bootstrap';
import 'brace/mode/json';
import 'brace/theme/github';
import firebase, {auth, provider} from '../containers/firebase.js';

export default class Editor extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      env: "preset: checkerboard",
      autoReload: true
    };
  }

  componentDidMount = () => {
    this.setState({text: this.props.text});
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
        if (this.state.autoReload) {
          let renderFun = this.props.actions.refresh;
          const itemsRef = firebase.database().ref(this.state.user.uid);
          itemsRef.on('value', (snapshot) => {
            let val = snapshot.val();
            if (val) {
              renderFun(val);
            }
          });
        }
      }
    });
  };

  logout = () => {
    auth.signOut().then(() => {
      this.setState({user: null});
    });
  };

  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({user});
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const content = this.refs.aceEditor.editor.session.getValue();
    if (this.state.user) {
      const itemRef = firebase.database().ref(this.state.user.uid);
      itemRef.set(content);
    }
    this.props.actions.refresh(content);
  };

  loadScene = () => {
    let renderFun = this.props.actions.refresh;
    if (this.state.user) {
      firebase.database().ref(this.state.user.uid).once('value')
        .then(function (snapshot) { renderFun(snapshot.val()); });
    }
  };

  sync = () => {
    this.setState({autoReload: !this.state.autoReload});
    if (this.state.autoReload && this.state.user) {
      let renderFun = this.props.actions.refresh;
      firebase.database().ref(this.state.user.uid).on('value')
        .then(function (snapshot) {
          let val = snapshot.val();
          if (val) {
            renderFun(val);
          }
        });
    }
  };

  lockScene = () => {
    this.setState({autoReload: !this.state.autoReload});
  };

  remove = () => {
    const content = this.refs.aceEditor.editor.session.getValue();
    this.props.actions.clear(content);
  };

  handleRender = () => {
    const content = this.refs.aceEditor.editor.session.getValue();
    this.props.actions.clear(content);
    this.props.actions.refresh(content);
  };

  elementButton = () => {
    return (
      <div className="btn-group btn-group-justified" role="group">
        <PSPlane render={this.props.actions.render} />
        <PSCurvedImg render={this.props.actions.render} />
        <PSText render={this.props.actions.render} />
        <PSButton render={this.props.actions.render} />
      </div>
    );
  };

  botButtons = () => {
    return (
      <div className="btn-group btn-group-justified" role="group">
        <div className="btn-group" >
          <button id="render" onClick={this.handleRender} type="button" className="btn btn-success" ><i className="fas fa-sync"></i> Render Scene</button>
        </div>
        <div className="btn-group" >
          <button onClick={this.remove} type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i> Clear Scene</button>
        </div>
      </div>
    );
  };
  render() {
    let text = this.props.text;
    return (
      <div id="editor" className="col-lg-4">
        <div className="btn-group btn-group-justified" role="group">
          <div className="btn-group" >
            <button onClick={this.handleSave} type="button" className="btn btn-default">
              <Glyphicon glyph="floppy-open" /> Upload </button>
          </div>
          <div className="btn-group" >
            {this.state.user
              ? <button className="btn btn-default" onClick={this.logout}>
                  <img width={20} height={17} src={this.state.user.photoURL} alt="thumbnail" />  Log Out
                </button>
              : <button className="btn btn-default" onClick={this.login}>
                  <Glyphicon glyph="user" /> Log In
                </button>
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
        <this.elementButton />
        <this.botButtons />
      </div >
    );
  }
}