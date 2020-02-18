/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReplyUser } from '../actions';

import { Comment } from 'semantic-ui-react';

const ReplyCard = (props) => {
	const dispatch = useDispatch();
	const replyUser = useSelector((state) => state.replyUser);

	useEffect(() => {
		dispatch(fetchReplyUser(props.reply.user_id));
	}, []);

	return (
		<Comment.Group>
			<Comment>
				<Comment.Content>
					<Comment.Author as="a">{replyUser.username}</Comment.Author>
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
