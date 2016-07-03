
const SubscribableMixin = {

  componentWillMount() {
    this._subscribableSubscriptions = [];
  },

  componentWillUnmount() {
    this._subscribableSubscriptions.forEach(
      (subscription) => subscription.remove()
    );
    this._subscribableSubscriptions = null;
  },

  /**
   * Special form of calling `addListener` that *guarantees* that a
   * subscription *must* be tied to a component instance, and therefore will
   * be cleaned up when the component is unmounted. It is impossible to create
   * the subscription and pass it in - this method must be the one to create
   * the subscription and therefore can guarantee it is retained in a way that
   * will be cleaned up.
   *
   * @param {EventEmitter} eventEmitter emitter to subscribe to.
   * @param {string} eventType Type of event to listen to.
   * @param {function} listener Function to invoke when event occurs.
   * @param {object} context Object to use as listener context.
   */
  addListenerOn(eventEmitter, eventType, listener, context) {
    this._subscribableSubscriptions.push(
      eventEmitter.addListener(eventType, listener, context)
    );
  }
};

const Subscribable = {
  Mixin: SubscribableMixin,
};

module.exports = Subscribable;
