import React, { Component } from 'react';
import UserCard from '../UserCard';

class UsersList extends Component {

    componentDidMount() {
        if (!this.props.usersList) {
            this.props.loadUsers();
        }
    }

    render() {
        const { usersList } = this.props;
        return !usersList ? null : usersList.map(user => <UserCard key={user.id} {...user} />)
    }
}

export default UsersList;