var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'BGCPromoTeam@gmail.com',
    pass: 'Lol123123'
  }
});

var mailOptions = {
  from: 'bgcpromoteam@gmail.com',
  to: 'tommychang97@gmail.com',
  subject: 'New promotion gear order request received',
  html: 'Hello BGC Promotional Gear team, a new order has just been received. The order # is: '
};

function sendEmail(req, res, next) {
    mailOptions.html += req.params.order_id;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          next();
        }
      });
}
module.exports = {
  sendEmail
}
