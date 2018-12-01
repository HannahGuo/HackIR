/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

function getProfilePicUrl(p) {
  if (p == "welcomeBot") {
    return "/images/welcome_bot.png";
  }
  return "/images/profile_placeholder.png";
}

function getUserName() {
  return "bob";
}

function loadMessages() {
  var callback = function (snap) {
    var data = snap.val();
    displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
  };

  firebase.database().ref('/messages/').limitToLast(50).on('child_added', callback);
  firebase.database().ref('/messages/').limitToLast(50).on('child_changed', callback);
}

function saveMessage(messageText) {
  console.log("this ran");
  return firebase.database().ref('/messages/').push({
    name: getUserName(),
    text: messageText,
    profilePicUrl: getProfilePicUrl()
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

function displayMessage(key, name, text, imageUrl) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
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

  // Show the card fading-in and scroll to view the new message.
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

function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
}

checkSetup();

// Shortcuts to DOM Elements.
var messageListElement = document.getElementById('messages');
var messageFormElement = document.getElementById('message-form');
var messageInputElement = document.getElementById('message');
var submitButtonElement = document.getElementById('submit');
var userPicElement = document.getElementById('user-pic');
var userNameElement = document.getElementById('user-name');

// Saves message on form submit.
messageFormElement.addEventListener('submit', onMessageFormSubmit);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

// We load currently existing chat messages and listen to new ones.
loadMessages();