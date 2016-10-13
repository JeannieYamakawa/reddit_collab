$(document).ready(() => {
  console.log('booya');

  $('.upvote').on('click', function () {
    console.log('clicked up on post:' + this.value);
    $.ajax({
          method: 'POST',
          url: '/post/upvote',
          data: {
            postID: this.value,
          },
          success: function(data) {
            res.send(data);
          },
    });
  });

  $('.downvote').on('click', function () {
    console.log('clicked down on post:' + this.value);
    $.ajax({
          method: 'POST',
          url: '/post/downvote',
          data: {
            postID: this.value,
          },
          success: function(data) {
            res.send(data);
          },
    });
  });

});
