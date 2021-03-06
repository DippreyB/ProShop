import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from     '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getDetails, updateUser} from '../actions/userActions.js'



const UserEditScreen = ({match, history}) => {
    const userId = match.params.id
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState('false')
    

  

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const updatedUser = useSelector(state => state.updatedUser)
    

    useEffect(()=> {
        if(!user.name || user._id !== userId){
            dispatch(getDetails(userId))
        }else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    },[dispatch, userId, user])

    const submitHandler = async (e) =>{
        e.preventDefault()
        const updatedUser = {
            id: userId,
            name: name,
            email: email,
            isAdmin: isAdmin,
        }
        await dispatch(updateUser(updatedUser))
        dispatch(getDetails(userId))
    }

    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
            <h1>Edit User</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                (
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} >
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} >
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin'>
                        
                        <Form.Check type='checkbox' label='Is Admin?' checked={Boolean(isAdmin)} onChange={(e) => setIsAdmin(e.target.checked)} >
                        </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                        {   updatedUser.error && <Message variant='danger'>{updatedUser.error}</Message> 
                             
                        
                        }
                    </Form>
                )
            }
            
            
        </FormContainer>
        </>
        
    )
}

export default UserEditScreen
