import React, { useEffect } from 'react';
import '../../utils/http';
import {Button} from 'antd';
import { connect } from 'react-redux';
import { ConnectProps } from '@/typings/interface';
interface STORE {
  count: number
}

const getStore = (store: STORE) => {
  console.log(store);
  return store;
}

const actions =  {
    onClick: (payload) => (dispatch) => {
      dispatch({
        type: 'UPDATE',
        payload,
      })
    }
}

type IProps = ConnectProps<typeof getStore, typeof actions>
class App extends React.Component<IProps>{
  constructor(props) {
    super(props);
    props

  }
  state = {
    theme: 'red',
    tag: ''
  }
  render() {
    const {count} = this.props;
    
    return (
      <div>
        <Button onClick={() => this.props.onClick({count: 0}) }>{count}</Button>
      </div>
    );
  }
}

export default connect(getStore, actions)(App);


