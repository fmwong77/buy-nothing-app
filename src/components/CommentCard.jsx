/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Comment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { replyInfo, fetchReplies } from '../actions';
import ReplyCard from './ReplyCard';

const CommentCard = (props) => {
	console.log(props.comment);
	const dispatch = useDispatch();
	const replies = useSelector((state) => state.reply);

	useEffect(() => {
		dispatch(fetchReplies(props.comment.id));
	}, []);

	const handleReply = (e) => {
		console.log('replying');
		console.log(props.comment.id);

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

	// console.log(replies);

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
