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
  it('should exist', () => {
    let wrapper = shallow(<DropdownAlert />)
    should.exist(wrapper)
  })
  it('should find custom sub components', () => {
    let wrapper = shallow(<DropdownAlert imageUri={'https://facebook.github.io/react/img/logo_og.png'} />)
    wrapper.instance().alert('custom', 'Title', 'Message')
    wrapper.update()
    expect(wrapper.find(StatusBar)).to.have.length(0)
    expect(wrapper.find(View)).to.have.length(2)
    expect(wrapper.find(Animated.View)).to.have.length(1)
    expect(wrapper.find(TouchableHighlight)).to.have.length(1)
    expect(wrapper.find(Text)).to.have.length(2)
    expect(wrapper.find(Image)).to.have.length(1)
  })
  it('should dismiss', () => {
    let wrapper = shallow(<DropdownAlert />)
    wrapper.instance().dismiss()
    wrapper.update()
    wrapper.instance().should.be.ok
  })
})
