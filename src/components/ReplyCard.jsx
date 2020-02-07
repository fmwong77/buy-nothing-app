/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReplies } from '../actions';

import { Comment } from 'semantic-ui-react';

const ReplyCard = (props) => {
	console.log(props.reply);
	const dispatch = useDispatch();
	const replies = useSelector((state) => state.reply);

	// useEffect(() => {
	// 	dispatch(fetchReplies(props.comment_id));
	// }, []);

	return (
		<Comment.Group>
			{/* {replies.length === 0
				? null
				: replies.map((reply) => ( */}
			<Comment>
				<Comment.Content>
					<Comment.Author as="a">{}</Comment.Author>
					<Comment.Metadata>
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
