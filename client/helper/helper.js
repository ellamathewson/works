/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const handleError = (message) => {
  $('#error').text = message;
  $('#error').fadeIn(200);
};

const handleSuccess = (message) => {
  $('#success').text = message;
  $('#success').fadeIn(200);
};

const handleSubSuccess = (message) => {
  $('#subSuccess').text = message;
  $('#subSuccess').fadeIn(200);
};

const redirect = (response) => {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};

/* Sends Ajax request */
const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data,
    dataType: 'json',
    success: (result, status, xhr) => {
      $('#error').fadeOut(200);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    },
  });
};

const sendGenericAjax = (method, action, data, callback) => {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data,
    dataType: 'json',
    success: callback,
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    },
  });
};

const sendAjaxWithCallback = (action, data, callback) => {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, error) {
      const messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    },
  });
};
