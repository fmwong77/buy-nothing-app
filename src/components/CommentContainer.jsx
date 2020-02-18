/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Comment, Header, Form, Button } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchComments, postComment, postReply, replyInfo } from '../actions';
import CommentCard from './CommentCard';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

const CommentContainier = (props) => {
	const dispatch = useDispatch();
	const comments = useSelector((state) => state.comments);
	const user = useSelector((state) => state.user);
	const replyState = useSelector((state) => state.replyInfo);

	useEffect(() => {
		dispatch(fetchComments(props.match.params.id));
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (e.target.name === 'generate') {
			const rnd = Math.random() * (comments.length - 1) + 1;
			Swal.fire({
				title: 'Your lucky number is...',
				text: `${Math.round(rnd)}`,
				icon: 'success',
				confirmButtonText: 'Ok'
			});
		} else {
			if (e.target.content.value.length > 0) {
				dispatch(
					postComment(props.match.params.id, user.id, e.target.content.value)
				);
				resetReplyState();
			}
		}
		props.history.push('/manage-my-post');
	};

	const resetReplyState = () => {
		dispatch(replyInfo(null));
	};

	const handleSubmitReply = (e) => {
		e.preventDefault();
		if (e.target.name === 'close') {
			resetReplyState();
		} else {
			if (e.target.content.value.length > 0) {
				const data = {
					comment_id: replyState[0].comment_id,
					user_id: user.id,
					content: e.target.content.value
				};
				dispatch(postReply(data));
				resetReplyState();
			}
		}
	};

	return (
		<div align="middle">
			<br></br>
			<br></br>
			<br></br>
			<Comment.Group align="left">
				<Header as="h3" dividing>
					Comments
				</Header>
				{comments.length === 0
					? null
					: comments.map((comment) => <CommentCard comment={comment} />)}
				<Form comment onSubmit={handleSubmit}>
					<Form.TextArea name="content" />
					<Button
						content="Add Comment"
						labelPosition="left"
						icon="edit"
						primary
						type="submit"
					/>
					{comments.length > 0 && comments[0].post.user_id === user.id ? (
						<Button
							content="Generate Random Number"
							labelPosition="left"
							icon="gift"
							primary
							name="generate"
							onClick={(e) => handleSubmit(e)}
						/>
					) : null}
				</Form>

				{replyState.length === 0 ? null : (
					<Form reply onSubmit={handleSubmitReply}>
						<Form.TextArea
							name="content"
							defaultValue={`@${replyState[0].username} `}
						/>
						<Button
							content="Add Reply"
							labelPosition="left"
							icon="edit"
							primary
							type="submit"
						/>
						<Button
							content="Close"
							labelPosition="left"
							icon="window close outline"
							primary
							name="close"
							onClick={(e) => handleSubmitReply(e)}
						/>
					</Form>
				)}
			</Comment.Group>
		</div>
	);
};

export default withRouter(CommentContainier);
