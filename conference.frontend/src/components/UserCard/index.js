import React from 'react';

const UserCard = (props) => (
    <div>
      <h3>Логин: {props.login}</h3>
      <h5>Имя: {props.name}</h5>
      <p>Пароль: {props.password}</p>
    </div>
);

export default UserCard;