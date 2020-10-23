import { connect } from 'react-redux';
import { compose, withState, lifecycle } from 'recompose';

import { loadChartsData } from '../reducers/charts';

import ChartsScreen from '../screens/ChartsScreen';

export default compose(
  connect(
    state => ({
      data: state.charts.data,
      isLoading: state.charts.isLoading
    }),
    dispatch => ({
      loadChartsData: () => dispatch(loadChartsData())
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadChartsData();
    }
  })
)(ChartsScreen);