import * as React from "react";
import { Request } from '../../Request';
import Snackbar from '@material-ui/core/Snackbar';


export default function AddBookmark(props) {
    
    const [message, setMessage] = React.useState('');

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
      };

    const submit = function() {
        // console.log(props.issueId);
        if(localStorage.getItem("token")) {
            const req = new Request();

            const data = {
                "issue_id": props.issueId,
                "article_id": props.articleId,
                "page_id": props.page,
                "type": props.type
            }

            setState({ ...state, open: true});
            req.post('bookmarks/add',data)
            .then((payload) => {
                
                console.log(payload);
                setMessage(payload.message);
            }
            );
        } else {
            var el = document.getElementById('js-login-header-link');
            el.dispatchEvent(
              new MouseEvent('click', {
                  view: window,
                  bubbles: true,
                  cancelable: true,
                  buttons: 1
              })
            )
        }
    }
    return (
        <>
       
        <label onClick={submit} className="custom-checkbox-label"></label>

        <Snackbar
            open={open}
            onClose={handleClose}
            message={message}
            autoHideDuration={2000}
        />
        </>
    )
}