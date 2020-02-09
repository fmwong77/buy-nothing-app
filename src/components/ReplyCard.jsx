/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReplyUser } from '../actions';

import { Comment } from 'semantic-ui-react';

const ReplyCard = (props) => {
	console.log(props.reply);
	// console.log(props.comment_id);
	const dispatch = useDispatch();
	const replyUser = useSelector((state) => state.replyUser);

	let filtered = [];
	useEffect(() => {
		dispatch(fetchReplyUser(props.reply.user_id));
	}, []);
	console.log(replyUser);

	return (
		<Comment.Group>
			{/* {replies.length === 0
				? null
				: replies.map((reply) => ( */}
			<Comment>
				<Comment.Content>
					<Comment.Author as="a">{replyUser.username}</Comment.Author>
					<Comment.Metadata>
						{/* <div>{props.reply.created_at}</div> */}
						<div>{props.reply.created_at}</div>
					</Comment.Metadata>
					<Comment.Text>{props.reply.content}</Comment.Text>
				</Comment.Content>
			</Comment>
			{/* ))} */}
		</Comment.Group>
	);
};

export default ReplyCard;
