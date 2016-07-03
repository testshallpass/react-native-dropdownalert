import React from 'react';
import ScrollResponder from '../mixins/ScrollResponder';
import TimerMixin from 'react-timer-mixin';
import ScrollView from './ScrollView';
import ListViewDataSource from '../api/ListViewDataSource';

const { PropTypes } = React;
const SCROLLVIEW_REF = 'listviewscroll';


const ListView = React.createClass({
  propTypes: {
    ...ScrollView.propTypes,

    dataSource: PropTypes.instanceOf(ListViewDataSource).isRequired,
    /**
     * (sectionID, rowID, adjacentRowHighlighted) => renderable
     *
     * If provided, a renderable component to be rendered as the separator
     * below each row but not the last row if there is a section header below.
     * Take a sectionID and rowID of the row above and whether its adjacent row
     * is highlighted.
     */
    renderSeparator: PropTypes.func,
    /**
     * (rowData, sectionID, rowID, highlightRow) => renderable
     *
     * Takes a data entry from the data source and its ids and should return
     * a renderable component to be rendered as the row.  By default the data
     * is exactly what was put into the data source, but it's also possible to
     * provide custom extractors. ListView can be notified when a row is
     * being highlighted by calling highlightRow function. The separators above and
     * below will be hidden when a row is highlighted. The highlighted state of
     * a row can be reset by calling highlightRow(null).
     */
    renderRow: PropTypes.func.isRequired,
    /**
     * How many rows to render on initial component mount.  Use this to make
     * it so that the first screen worth of data appears at one time instead of
     * over the course of multiple frames.
     */
    initialListSize: PropTypes.number,
    /**
     * Called when all rows have been rendered and the list has been scrolled
     * to within onEndReachedThreshold of the bottom.  The native scroll
     * event is provided.
     */
    onEndReached: PropTypes.func,
    /**
     * Threshold in pixels for onEndReached.
     */
    onEndReachedThreshold: PropTypes.number,
    /**
     * Number of rows to render per event loop.
     */
    pageSize: PropTypes.number,
    /**
     * () => renderable
     *
     * The header and footer are always rendered (if these props are provided)
     * on every render pass.  If they are expensive to re-render, wrap them
     * in StaticContainer or other mechanism as appropriate.  Footer is always
     * at the bottom of the list, and header at the top, on every render pass.
     */
    renderFooter: PropTypes.func,
    renderHeader: PropTypes.func,
    /**
     * (sectionData, sectionID) => renderable
     *
     * If provided, a sticky header is rendered for this section.  The sticky
     * behavior means that it will scroll with the content at the top of the
     * section until it reaches the top of the screen, at which point it will
     * stick to the top until it is pushed off the screen by the next section
     * header.
     */
    renderSectionHeader: PropTypes.func,
    /**
     * (props) => renderable
     *
     * A function that returns the scrollable component in which the list rows
     * are rendered. Defaults to returning a ScrollView with the given props.
     */
    renderScrollComponent: React.PropTypes.func.isRequired,
    /**
     * How early to start rendering rows before they come on screen, in
     * pixels.
     */
    scrollRenderAheadDistance: React.PropTypes.number,
    /**
     * (visibleRows, changedRows) => void
     *
     * Called when the set of visible rows changes.  `visibleRows` maps
     * { sectionID: { rowID: true }} for all the visible rows, and
     * `changedRows` maps { sectionID: { rowID: true | false }} for the rows
     * that have changed their visibility, with true indicating visible, and
     * false indicating the view has moved out of view.
     */
    onChangeVisibleRows: React.PropTypes.func,
    /**
     * A performance optimization for improving scroll perf of
     * large lists, used in conjunction with overflow: 'hidden' on the row
     * containers.  This is enabled by default.
     */
    removeClippedSubviews: React.PropTypes.bool,
    /**
     * An array of child indices determining which children get docked to the
     * top of the screen when scrolling. For example, passing
     * `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the
     * top of the scroll view. This property is not supported in conjunction
     * with `horizontal={true}`.
     * @platform ios
     */
    stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number),
  },
  mixins: [ScrollResponder.Mixin, TimerMixin],

  statics: {
    DataSource: ListViewDataSource,
  },

  /**
   * Exports some data, e.g. for perf investigations or analytics.
   */
  getMetrics() {  // eslint-disable-line react/sort-comp
    // It's fixed, but the linter doesnt want to recognise it...
    return {
      contentLength: this.scrollProperties.contentLength,
      totalRows: this.props.dataSource.getRowCount(),
      renderedRows: this.state.curRenderedRowsCount,
      visibleRows: Object.keys(this._visibleRows).length,
    };
  },

  scrollTo(destY, destX) {
    this.getScrollResponder().scrollResponderScrollTo(destX || 0, destY || 0);
  },

  /**
   * Provides a handle to the underlying scroll responder to support operations
   * such as scrollTo.
   */
  getScrollResponder() {
    return this.refs[SCROLLVIEW_REF] &&
      this.refs[SCROLLVIEW_REF].getScrollResponder &&
      this.refs[SCROLLVIEW_REF].getScrollResponder();
  },

  setNativeProps(props) {
    this.refs[SCROLLVIEW_REF].setNativeProps(props);
  },

  getDefaultProps() {
    return {
      renderScrollComponent: (props) => <ScrollView {...props} />
    };
  },

  getInnerViewNode() {
    return this.refs[SCROLLVIEW_REF].getInnerViewNode();
  },

  render() {
    return null;
  },
});

module.exports = ListView;
