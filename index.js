var express = require('express');

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'virtualtherapistTT@gmail.com',
        pass: 'Qpwo1234'
    }
});

var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.set('port', (process.env.PORT || 5000))

app.use('/', express.static(__dirname + '/public'));



// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails


app.post('/api/bookAppointment',function(req, res){



  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Virtual Therapist <virtualtherapistTT@gmail.com>', // sender address
      to: 'virtualtherapist@mailinator.com, virtualtherapistTT@gmail.com', // list of receivers
      subject: 'New Appointment: ' + req.body.name  + ' on ' + req.body.day + ' ' + req.body.times , // Subject line

      html: '<p> We have received a new appointment. The details are as follows:<br/><br/> '
       + 'Name: ' + req.body.name + '<br/>Email: ' + req.body.email +'<br/>'
       + 'Address: ' + req.body.address +'<br/>Phone number: '+ req.body.phonenumber +'<br/>'
       + 'Therapist preference: ' + req.body.preference + '<br/>Therapist name: ' + req.body.therapistname + '<br/>'
       + 'Date: ' + req.body.day + ' ' + req.body.times
       +'</p>'// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          console.log('Message sent: ' + info.response);
      }
  });
  console.log(JSON.stringify(req.body));

});

app.listen(app.get('port'), function() {
  console.log('listening')
});
