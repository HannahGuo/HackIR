'use strict';

function getUserName() {
  return localStorage.getItem("username").substring(15);
}

function loadMessages() {
  var callback = function (snap) {
    var data = snap.val();
    displayMessage(snap.key, data.name, data.text);
  };

  firebase.database().ref('/messages/').limitToLast(50).on('child_added', callback);
  firebase.database().ref('/messages/').limitToLast(50).on('child_changed', callback);
}

function saveMessage(messageText) {
  return firebase.database().ref('/messages/').push({
    name: getUserName(),
    text: messageText,
  }).catch(function (error) {
    console.error('Error writing new message to Realtime Database:', error);
  });
}

function onMessageFormSubmit(e) {
  e.preventDefault();
  if (messageInputElement.value) {
    saveMessage(messageInputElement.value).then(function () {
      resetMaterialTextfield(messageInputElement);
      toggleButton();
    });
  }
}

function resetMaterialTextfield(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
}

var MESSAGE_TEMPLATE =
  '<div class="message-container">' +
  '<div class="spacing"><div class="pic"></div></div>' +
  '<div class="message"></div>' +
  '<div class="name"></div>' +
  '</div>';

var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function displayMessage(key, name, text) {
  var div = document.getElementById(key);
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    messageListElement.appendChild(div);
  }

  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  messageElement.textContent = text;
  messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');

  setTimeout(function () {
    div.classList.add('visible')
  }, 1);
  messageListElement.scrollTop = messageListElement.scrollHeight;
  messageInputElement.focus();
}

function toggleButton() {
  if (messageInputElement.value) submitButtonElement.removeAttribute('disabled');
  else submitButtonElement.setAttribute('disabled', 'true');
}

var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');

messageFormElement.addEventListener('submit', onMessageFormSubmit);
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

function showGameQ() {
  document.getElementById("game").innerHTML = localStorage.getItem("games");
}

function showName() {
  document.getElementById("username").innerHTML = localStorage.getItem("username");
}

function generateTopic(rand) {
  return topics[rand];
}

var topics = [
  "Favourite Movie",
  "Recent Marvel Events",
  "Harry Potter",
  "Favourite bands", 
  "Favourite Foods", 
  "Latest Movie You've seen", 
  "Favourite Subject", 
  "Dream Jobs",
  "Marvel vs. DC"
]

function genTop() {
  var rand = Math.floor(Math.random() * (topics.length));

  var genTop = [generateTopic(rand), generateTopic(rand - 1), generateTopic(rand - 2), generateTopic(rand - 3)];
  
  if(genTop[1] === undefined) {
    genTop[1] = generateTopic(rand + 1);
  }

  if(genTop[2] === undefined) {
    genTop[2] = generateTopic(rand + 2);
  }

  if(genTop[3] === undefined) {
    genTop[3] = generateTopic(rand + 3);
  }

  document.getElementById("top1").innerHTML = genTop[0];
  document.getElementById("top2").innerHTML = genTop[1];
  document.getElementById("top3").innerHTML = genTop[2];
  document.getElementById("top4").innerHTML = genTop[3];
}

window.onload = showName;
window.onload = genTop;

loadMessages();