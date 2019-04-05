import React, { Component } from 'react';
import { keyBy } from 'lodash';

import withApi from '../../hocs/withApi';
import Loading from '../../ui/loading';
import Heading from '../../ui/heading';
import UserCard from '../../ui/userCard';

import '../../styles/containers/matches.css';

class Matches extends Component {
  state = {
    loading: true
  }

  componentDidMount = () => {
    this.props.get('/user/matches')
    .then(res => {
      this.props.setMatches(keyBy(res.data, o => o.id));
      this.setState({ loading: false })
    })
  }
  

  render() {
    return (
      <>
      {
        this.state.loading
        ? <Loading />
        : <div className='matches'>
            <Heading title='Your matches...'/>
            <div className='matches__list'>
              {
                Object.entries(this.props.matches).map(([id, match]) => {
                  return <UserCard style={{marginRight: '1rem'}} key={id} user={match} onClick={() => this.props.onMatchClick(id)} />
                })
              }
            </div>
          </div>
      }
      </>
    )
  }
}

export default withApi(Matches);