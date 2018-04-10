import React from 'react';
import Editor  from '../components/Editor';
import View from '../components/View';
import {render, refresh, clear} from '../actions'
import logo from '../logo.svg';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const App = ({text, objects, base, actions}) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
     <h1 className="App-title">Proto Star</h1>   
    </header>
    <div>
      <Editor text={text} actions={actions} />
      <View text={text}  objects={objects} />
    </div>
  </div>
)

App.propTypes = {
  text: PropTypes.string.isRequired,
  objects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  text: state.editor.text,
  base: state.editor.base,
  objects: state.editor.objs
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({render,refresh, clear}, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

