{ 
    //  Method to submit the form data for new Post using AJAX
    let createPost = function() {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data) {
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);   
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-btn', newPost));

                    new Noty({
                        theme: 'relax',
                        text: 'Post Created',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                },
                error: function(err) {
                    console.log(err.responseText);
                }
            })
            $('#new-post-form').trigger("reset");
        })
    }

    // to create post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${post._id}">
                    <div class="main-post">
                        <a class="delete-post-btn" href="/posts/destroy/${post._id}">X</a>
                        <p class="post-content">"${post.content }"</p>
                        <p class="post-user">~${post.user.name}</p>
                    </div>
                    <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Add Comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Comment">
                        </form>
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">

                            </ul>
                        </div>
                    </div>
                </li>`)
    }

    // method to delet post from dom
    let deletePost = function(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: 'Post Removed!',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();

                },
                error: function(error) {
                    console.log(error.responseText);
                }
            })
        });
    }

    createPost(); 
}