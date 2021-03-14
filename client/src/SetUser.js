import React,{useEffect,useState} from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser($firstName: String! $age: Int!) {
    addUser(firstName: $firstName, age: $age) {
        firstName
    }
  }
`;

const SetUser = () => {
    const [addUser, { data }] = useMutation(ADD_USER);
    const [firstName,setFirstName] = useState("");
    const [age,setAge] = useState(0);

    useEffect(() => {
        console.log(data);
    },[data]);

    const handleSubmit = () => {
        addUser({
            variables:{
                firstName,
                age
            }
        })
    };

    return (
        <>
            <input type="text" value={firstName} onChange={e => {setFirstName(e.target.value)}}/>
            <input type="number" value={age} onChange={e => {setAge(e.target.value)}}/>
            <button onClick={handleSubmit}>Add user</button>
        </>
    );
};

export default SetUser;