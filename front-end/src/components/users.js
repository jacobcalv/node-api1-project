import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

function Users() {
    const [users, setUsers] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/users')
            .then(res => {
                setUsers(res.data.users)
            })
            .catch(error => {
                console.log("error:", error);
              });
    }, [])
    console.log(users)

 
    const Card = styled.div`
        border: 3px solid black;
        width: 25%;
        margin: 3rem;
    `
    const Name = styled.h1`
        text-align: center;
    `
    const Bio = styled.h1`
        text-align: center;
    `
    return (
        <div>
            {users.map(user => 
                <Card>
                    <Name>Name: {user.name}</Name>
                    <Bio>Bio: {user.bio}</Bio>
                    {/* <button onClick={deleteUser(user.id)}>Delete</button> */}
                </Card>
            )}
        </div>
    )
}

export default Users
