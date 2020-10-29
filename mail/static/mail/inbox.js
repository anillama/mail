document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#disss').addEventListener('click', dis);

  // By default, load the inbox
  load_mailbox('inbox');

});

  function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#readData').style.display = 'block';
  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  if (mailbox === 'inbox'){
    //compose_email();
    readInbox(mailbox);
  }else if(mailbox === 'sent'){
    readInbox(mailbox);
  }else {
    readInbox(mailbox)
  }
}

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#readData').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

}

function readInbox(nameMail){
  
  if (nameMail === 'inbox'){
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#readData').style.display = 'none';
    fetch(`emails/${nameMail}`)
    .then(response => response.json())
    .then(emails => {
      if (emails.error == 'Invalid mailbox.'){
        document.querySelector('#readData').innerHTML = `<h4>${emails.error}</h4>`
      }
      else{
        for(var i = 0; i < emails.length; i++){
          emailSubj = emails[i]['subject']
          emailSender = emails[i]['sender']
          emailId = emails[i]['id']
          emailTime = emails[i]['timestamp']
          emailRead = emails[i]['read']
          emailRecipients = emails[i]['recipients']
            displayEmail(emailSender, emailSubj, emailTime, emailId, nameMail, emailRead, emailRecipients)
        }
      }
    })
    //document.querySelector('#readData').innerHTML = `<h4>Read Inbox</h4>`
  }else if (nameMail === 'sent'){
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#readData').style.display = 'none';
    fetch(`emails/${nameMail}`)
    .then(response => response.json())
    .then(emails => {
      if (emails.error == 'Invalid mailbox.'){
        document.querySelector('#readData').innerHTML = `<h4>${emails.error}</h4>`
      }
      else{
        for(var i = 0; i < emails.length; i++){
          emailSubj = emails[i]['subject']
          emailSender = emails[i]['sender']
          emailId = emails[i]['id']
          emailTime = emails[i]['timestamp']
          emailRead = emails[i]['read']
          emailRecipients = emails[i]['recipients']
            displayEmail(emailSender, emailSubj, emailTime, emailId, nameMail, emailRead, emailRecipients)
        }
      }
    })
  }else {
    document.querySelector('#emails-view').style.display = 'block';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#readData').style.display = 'none';
    fetch(`emails/${nameMail}`)
    .then(response => response.json())
    .then(emails => {
      if (emails.error == 'Invalid mailbox.'){
        document.querySelector('#readData').innerHTML = `<h4>${emails.error}</h4>`
      }
      else{
        for(var i = 0; i < emails.length; i++){
          emailSubj = emails[i]['subject']
          emailSender = emails[i]['sender']
          emailId = emails[i]['id']
          emailTime = emails[i]['timestamp']
          emailRead = emails[i]['read']
          emailRecipients = emails[i]['recipients']
            displayEmail(emailSender, emailSubj, emailTime, emailId, nameMail, emailRead, emailRecipients)
        }
      }
    })
  }
}
function dis(event){

  var userReci = document.getElementById('compose-recipients').value;
  var userSubj = document.getElementById('compose-subject').value;
  var userBody = document.getElementById('compose-body').value;
  var flag = false;
  var x = 45;
    fetch(`emails`, {
    method: 'POST',
    body: JSON.stringify({
      recipients: userReci,
      subject: userSubj,
      body: userBody
    })
  })
  .then(response => response.json())
  .then(result => {
  if (result['error']){

    document.getElementById('message').innerHTML = result.error

  } else if (result['message']){
  
    document.getElementById('message').innerHTML = result.message;
    setTimeout(function(){document.getElementById('message').style.opacity = '0';}, 3000)
    //setTimeout(function(){document.getElementById('message').innerHTML = '';}, 1000)
    setTimeout(function(){load_mailbox('sent')}, 1000);
  }
  })
//event.preventDefault()
}

function displayEmail(idEmail, subjEmail, timeEmail, emailId, nameOfRequest, readStat, emailRecipients){
  const post = document.createElement('div')
  if (nameOfRequest === 'inbox' || nameOfRequest === 'archive'){
    if (readStat === true){
      post.innerHTML =`<a href="###" class="viewEmail" id=${emailId} value="${nameOfRequest}">
                             <spam class="firstLin"> ${idEmail} </spam>
                              ${subjEmail} 
                             <em>${timeEmail} </em>
                       </a>`
      document.querySelector('#emails-view').append(post)
    }else {
      post.innerHTML =`<a href="###" class="inboxArchive" id=${emailId} value="${nameOfRequest}">
                             <spam class="firstLin"> ${idEmail} </spam>
                              ${subjEmail} 
                             <em>${timeEmail} </em>
                       </a>`
      document.querySelector('#emails-view').append(post)
  }

  } else {
      post.innerHTML =`<a href="###" class="viewEmail" id=${emailId} value="${nameOfRequest}">
                             <spam class="firstLin"> To : ${emailRecipients} </spam>
                              ${subjEmail} 
                             <em>${timeEmail} </em>
                       </a>`
      document.querySelector('#emails-view').append(post)
}
}


document.addEventListener('click', event => {
  const element = event.target;
  if (element.className === 'inboxArchive' || element.className === 'viewEmail'){
    var value = document.getElementById(element.id).getAttribute('value');

    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#readData').style.display = 'none';
    document.querySelector('#readData').style.display = 'block';

    fetch(`emails/${element.id}`)
    .then(response => response.json())
    .then(email => {
      if (value === 'sent'){
        displayData = `<div id="read">
                          <div id="sender" value="${email.sender}">From: ${email.sender} </div>
                          <div id="to" value=${email.recipients}>to : ${email.recipients}</br> </div>
                          <hr>
                          <div id="subject" value="${email.subject}">Subject : ${email.subject} </div>
                          <hr>
                          <div id="timestamp" value="${email.timestamp}">Date : ${email.timestamp} </div>
                          <hr>
                          <div id="body" value="${email.body}">${email.body} </br></div>
                          </br>
                          <button type="button" class="btn btn-outline-dark">Replay </button>
                       </div>`
      }
      else if(value === 'inbox'){
        fetch(`emails/${email.id}`,{
          method: 'PUT',
          body: JSON.stringify({
            read:true
          })
        })
        displayData = `<div id="read">
                          <button type="button" id=${email.id} class="btn btn-outline-primary">Archive</button></br></br>
                          <div id="sender" value="${email.sender}">From: ${email.sender} </div>
                          <div id="to" value="${email.recipients}">to : ${email.recipients}</br> </div>
                          <hr>
                          <div id="subject" value="${email.subject}">Subject : ${email.subject} </div>
                          <hr>
                          <div id="timestamp" value="${email.timestamp}">Date : ${email.timestamp} </div>
                          <hr>
                          <div id="body" value="${email.body}">${email.body} </br></div>
                          </br>
                          <button type="button" class="btn btn-outline-dark">Replay </button>
                       </div>`
      } else {
        displayData = `<div id="read">
                          <button type="button" id="${email.id}" class="btn btn-outline-secondary">Unarchive</button></br></br>
                          <div id="sender" value="${email.sender}">From: ${email.sender} </div>
                          <div id="to" value="${email.recipients}">to : ${email.recipients}</br> </div>
                          <hr>
                          <div id="subject" value="${email.subject}">Subject : ${email.subject} </div>
                          <hr>
                          <div id="timestamp" value="${email.timestamp}">Date : ${email.timestamp} </div>
                          <hr>
                          <div id="body" value="${email.body}">${email.body} </br></div>
                          </br>
                          <button type="button" class="btn btn-outline-dark">Replay </button>
                       </div>`
      }
      document.getElementById('readData').innerHTML = displayData;
    })

  }
  else if(element.className === 'btn btn-outline-primary'){
    fetch(`/emails/${element.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: true
      })
    })
    location.reload()
    load_mailbox('inbox')
  } else if(element.className === 'btn btn-outline-secondary'){
    fetch(`/emails/${element.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        archived: false
      })
    })
    location.reload()
    load_mailbox('inbox')
  } else if(element.className === "btn btn-outline-dark"){
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'block';
    document.querySelector('#readData').style.display = 'none';

    var sender_email = document.getElementById('sender').getAttribute('value');
    var sender_to = document.getElementById('to').getAttribute('value');
    var sender_subj = document.getElementById('subject').getAttribute('value');
    var sender_time = document.getElementById('timestamp').getAttribute('value');
    var sender_body = document.getElementById('body').getAttribute('value');
    var checkRe = sender_subj.substring(0,3)

    if (checkRe === "Re:"){
      document.querySelector('#compose-subject').value = sender_subj;
    }
    else {
      document.querySelector('#compose-subject').value = 'Re: ' + sender_subj;
    }

    document.querySelector('#compose-recipients').value = sender_email;
    document.querySelector('#compose-body').value = 'On ' + sender_time + ' ' + sender_email + '  wrote :'+'\n\n' + sender_body;
  }
  
})


































