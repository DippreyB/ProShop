import React, {useState, useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from     '../components/Message'
import Loader from '../components/Loader'
import {deleteUser, getUsers} from '../actions/userActions'


const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading, error, users}  = userList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo}  = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin)
            dispatch(getUsers())
        else
            history.push('/login')
    }, [dispatch, history, userInfo])

    const deleteHandler = async (userId) => {
        if(window.confirm('Are you sure?')) {
        await dispatch(deleteUser(userId))
        dispatch(getUsers())
        }
    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ID</th>
                            <th>Admin</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user._id}</td>
                                <td>
                                    {user.isAdmin ? 
                                    (<i className='fas fa-check' style={{color: 'green'}} />) : 
                                    (<i className='fas fa-times' style={{color: 'red'}} />)}
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash' />
                                        </Button>
                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
