import React from 'react';
import { Comment } from 'semantic-ui-react';

const CommentCard = (props) => {
	console.log(props.comment);

	return (
		<Comment>
			{/* <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" /> */}
			<Comment.Content>
				<Comment.Author as="a">{props.comment.user.username}</Comment.Author>
				<Comment.Metadata>
					<div>{props.comment.created_at}</div>
				</Comment.Metadata>
				<Comment.Text>{props.comment.content}</Comment.Text>
				<Comment.Actions>
					<Comment.Action>Reply</Comment.Action>
				</Comment.Actions>
			</Comment.Content>
		</Comment>
	);
};

export default CommentCard;
