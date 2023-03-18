import Comment from "./Comment"
import AddComment from "./AddComment";
import { IComment } from "../../Interfaces/IComment"
import { IReply } from "../../Interfaces/IReply";

const CommentSection = ({comments}:{comments: IComment[]}) =>
{
  let commentsToDisplay = [];
  for(let i=0;i<comments.length;i++)
  {
    commentsToDisplay.push(<><Comment userName={comments[i].userName} date={comments[i].date} body={comments[i].body} replies={comments[i].replies}/></>) 
  }
  commentsToDisplay.push(<AddComment />)

  return(
    <div>
      {commentsToDisplay}
    </div>
  )
}

export default CommentSection