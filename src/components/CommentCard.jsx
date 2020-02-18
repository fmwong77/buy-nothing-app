import React, { useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { replyInfo, fetchReplies } from '../actions';
import ReplyCard from './ReplyCard';

const CommentCard = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchReplies(props.comment.id));
	}, [dispatch, props.comment.id]);

	const handleReply = (e) => {
		const data = [
			{
				comment_id: props.comment.id,
				user_id: props.comment.user.id,
				username: props.comment.user.username,
				content: ''
			}
		];
		dispatch(replyInfo(data));
	};

	return (
		<Comment>
			{/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
			<Comment.Content>
				<Comment.Author as="a">{props.comment.user.username}</Comment.Author>
				<Comment.Metadata>
					<div>{props.comment.created_at}</div>
				</Comment.Metadata>
				<Comment.Text>{props.comment.content}</Comment.Text>
				{props.comment.replies.length === 0
					? null
					: props.comment.replies.map((reply) => (
							<ReplyCard reply={reply} comment_id={props.comment.id} />
					  ))}
				{/* <ReplyCard comment_id={props.comment.id} /> */}
				<Comment.Actions>
					<Comment.Action onClick={handleReply}>Reply</Comment.Action>
				</Comment.Actions>
			</Comment.Content>
		</Comment>
	);
};

export default CommentCard;
