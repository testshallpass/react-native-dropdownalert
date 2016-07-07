const React = require('react')
const should = require('should')
const { shallow } = require('enzyme')
const { expect } = require('chai')

import DropdownAlert from '../DropdownAlert'
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
})
