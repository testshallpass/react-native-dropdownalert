const React = require('react')
const should = require('should')
const { shallow } = require('enzyme')
const DropdownAlert = require('../DropdownAlert')
const { expect } = require('chai')

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Modal,
  StatusBar,
  Image
} from "react-native"

describe('DropdownAlert', () => {
  let dropdownAlert
  before(() => {
    dropdownAlert = shallow(<DropdownAlert />)
  })
  it('should exist', () => {
    DropdownAlert.should.be.ok
  })
  it('should equal DropdownAlert', () => {
     dropdownAlert.unrendered.type.displayName.should.equal('DropdownAlert')
  })
})
