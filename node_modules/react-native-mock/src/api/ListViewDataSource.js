

class ListViewDataSource {
  constructor() {
    this._dataBlob = null;
  }

  getRowCount() {

  }

  cloneWithRows(data) {
    const newSource = new ListViewDataSource();
    newSource._dataBlob = data;

    return newSource;
  }

  cloneWithRowsAndSections(data) {
    const newSource = new ListViewDataSource();
    newSource._dataBlob = data;

    return newSource;
  }
}

module.exports = ListViewDataSource;
