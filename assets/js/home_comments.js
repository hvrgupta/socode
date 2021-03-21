{
    const createComment = function() {
        let newCommentForm = $('#new-comment-form');

        newCommentForm.submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newCommentForm.serialize(),
                success: function(data) {
                    let newComment = createCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.comment.post}`).prepend(newComment);
                    deleteComment($(' .delete-comment-btn'),newComment);
                    new Noty({
                        theme: 'relax',
                        text: 'Comment Created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(err) {
                    console.log(err.responseText);
                }
            })
            $('#new-comment-form').trigger("reset");
        })
    }
    
    let createCommentDom = function(comment) {
        return $(`<li>
                    <div class="main-comment" id="comment-${comment._id}">
                        <a class="delete-comment-btn" href="/comments/destroy/${comment._id}">X</a>
                        <p class="comment-content">'${comment.content}'</p>
                        <p class="comment-user">${comment.user.name}</p>
                    </div>
                </li>`)
    }

    const deleteComment = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();
            $.ajax({ 
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Comment Removed!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                },
                error: function(err) {
                    console.log(err.responseText);
                }
            })
        })

    }

    createComment();
}