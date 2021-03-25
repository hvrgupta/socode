const nodeMailer = require('../config/nodemailer');

// another way of exporting  method
exports.newComment = (comment) => {    
    console.log('inside new Comment mailer');

    nodeMailer.transporter.sendMail({
        from: 'socodedevelopment@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html: '<h1>Yup, your comment has been published</h1>'  
    },(err,info) => {
        if(err) { console.log('error in sending mail',err); return; }

        console.log('mail delivered',info);
        return;
    })
}