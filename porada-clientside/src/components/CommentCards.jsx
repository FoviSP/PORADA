import React, {useState, useEffect, useContext} from 'react'

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserForm from '../components/UserForm';
import CommentForm from '../components/CommentForm';

import {Context} from '../index'

import {getComments, removeComment} from '../http/commentAPI'

import dateformat from '../utils/dateformat'

const CommentCards = ({userId,pageId}) => {

	const [comments, setComments] = useState(null)
	const {userStorage} = useContext(Context)

	const destroyComment = (id) => {
		removeComment(id)
		getComments(pageId).then(data=>{
			setComments(data)
		})
	}

	useEffect(() => {
		getComments(pageId).then(data=>{
			setComments(data)
		})
	},[])

	

	if(comments == null || !Array.isArray(comments)){
		return(
			<Card body style={{textAlign: 'center'}}>
				Коментарів поки що не має
			</Card>
		)
	}

	return (
		<>
		{comments.map((elem, index)=>{
			return(
				<Card key={index} body>
					<div className="d-flex">
						<UserForm userId={elem.userId}/>
						<div style={{width: '80%'}}>
						<div style={{display: 'flex', justifyContent: 'space-between'}}>
							<Form.Text>{dateformat(elem.createdAt)}</Form.Text>
							{userStorage.user.role === 'ADMIN'
							&&
								<Button
									onClick={()=>destroyComment(elem.id)}
									variant='danger'
									style={{margin: '0 15px'}}
									size='sm'
								>
								Видалити
								</Button>
							}
						</div>
						{elem.content}
						</div>
					</div>
				</Card>
			)
		})
		}
		<CommentForm
			comments={comments}
			callBackComment={setComments}
			userId={userId}
			pageId={pageId}/>
		</>
		
	)
}

export default CommentCards