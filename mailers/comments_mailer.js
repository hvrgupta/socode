const nodeMailer = require('../config/nodemailer');

// another way of exporting  method
exports.newComment = (comment) => {    
    console.log('inside new Comment mailer');

    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new-comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'socodedevelopment@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published!',
        html: htmlString  
    },(err,info) => {
        if(err) { console.log('error in sending mail',err); return; }

        console.log('mail delivered',info);
        return;
    })
}