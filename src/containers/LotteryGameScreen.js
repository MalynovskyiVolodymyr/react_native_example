import { connect } from 'react-redux';
import { compose, withState, lifecycle } from 'recompose';

import { loadChartsData } from '../reducers/charts';

import LotteryGameScreen from '../screens/LotteryGameScreen';

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      loadChartsData: () => dispatch(loadChartsData())
    }),
  )
)(LotteryGameScreen);