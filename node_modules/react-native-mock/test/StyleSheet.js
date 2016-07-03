import { StyleSheet } from '../src/react-native';
import { expect } from 'chai';


describe('StyleSheet', () => {
  let styles;

  beforeEach(function () {
    styles = StyleSheet.create({
      listItem: {
        flex: 1,
        fontSize: 16,
        color: 'white'
      },
      selectedListItem: {
        color: 'green'
      },
      headerItem: {
        fontWeight: 'bold'
      }
    });
  });

  it('flatten', () => {
    const result = StyleSheet.flatten(styles.listItem);
    const expectedResult = {
      flex: 1,
      fontSize: 16,
      color: 'white'
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('flatten with array', () => {
    const result = StyleSheet.flatten([styles.listItem, styles.selectedListItem]);
    const expectedResult = {
      flex: 1,
      fontSize: 16,
      color: 'green'
    };
    expect(result).to.deep.equal(expectedResult);
  });

  it('flatten with nested array', () => {
    const result = StyleSheet.flatten(
      [styles.listItem, [styles.headerItem, styles.selectedListItem]]
    );
    const expectedResult = {
      flex: 1,
      fontSize: 16,
      color: 'green',
      fontWeight: 'bold'
    };
    expect(result).to.deep.equal(expectedResult);
  });
});
