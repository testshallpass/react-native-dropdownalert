
const TextInputState = {
  /**
   * Internal state
   */
  _currentlyFocusedID: null,

  /**
   * Returns the ID of the currently focused text field, if one exists
   * If no text field is focused it returns null
   */
  currentlyFocusedField() {
    return this._currentlyFocusedID;
  },

  /**
   * @param {number} TextInputID id of the text field to focus
   * Focuses the specified text field
   * noop if the text field was already focused
   */
  focusTextInput(textFieldID) {
    if (this._currentlyFocusedID !== textFieldID && textFieldID !== null) {
      this._currentlyFocusedID = textFieldID;
    }
  },

  /**
   * @param {number} textFieldID id of the text field to focus
   * Unfocuses the specified text field
   * noop if it wasn't focused
   */
  blurTextInput(textFieldID) {
    if (this._currentlyFocusedID === textFieldID && textFieldID !== null) {
      this._currentlyFocusedID = null;
    }
  }
};

module.exports = TextInputState;
