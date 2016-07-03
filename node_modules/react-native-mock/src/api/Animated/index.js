import View from '../../components/View';
import Text from '../../components/Text';
import Image from '../../components/Image';
import createAnimatedComponent from './createAnimatedComponent';
import AnimatedImplementation from './AnimatedImplementation';

module.exports = {
  ...AnimatedImplementation,
  createAnimatedComponent,
  View: createAnimatedComponent(View),
  Text: createAnimatedComponent(Text),
  Image: createAnimatedComponent(Image),
};
