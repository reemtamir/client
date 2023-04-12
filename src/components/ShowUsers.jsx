import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ShowUsers = ({ users, str, fn }) => {
  const { user, blockUserById } = useAuth();
  if (!users) return;

  const userFavorites = user.favorites;

  const filteredUsers = [].concat(
    ...userFavorites.map((favorite) =>
      users.filter((user) => {
        return favorite._id !== user._id;
      })
    )
  );

  return (
    <>
      {users.map((element, index) => {
        return (
          <div key={index} className="users-container">
            <i
              className={`bi bi-dash-circle-fill`}
              id={element._id}
              onClick={async () => {
                const data = await blockUserById(user.email, element._id);

                return data;
              }}
            ></i>
            <i
              className={`${str}`}
              id={element._id}
              onClick={async () => {
                const data = await fn(user.email, element._id);

                return data;
              }}
            ></i>

            <div className="min-height">
              <img src={element.image} alt={`${element.name} `} />
            </div>

            <div className="card-body">
              <ul className="ul">
                <li>
                  {element.name}, {element.age}
                </li>
              </ul>
            </div>
            <Link className="link" to="/private">
              Send private message
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ShowUsers;
