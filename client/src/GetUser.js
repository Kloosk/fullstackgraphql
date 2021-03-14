import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_USERS = gql`
    {
      users{
        id
        firstName
        age
      }
    }
`;

const GetUser = () => {
    const { loading, error, data } = useQuery(ALL_USERS);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.users.map(({ id,firstName,age}) => (
        <div key={id}>
            <p>
                {firstName}
                {age}
            </p>
        </div>
    ));
};

export default GetUser;