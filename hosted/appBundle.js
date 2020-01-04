"use strict";

/* eslint-disable linebreak-style */
var handleMeal = function handleMeal(e) {
  e.preventDefault();
  $('#error').fadeIn(300);

  if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
    handleError('All fields are required');
    return false;
  }

  sendGenericAjax('POST', $('#mealForm').attr('action'), $('#mealForm').serialize(), function () {
    loadMealsFromServer();
  });
  console.log($('#mealName').val);
  $('#mealName').value = '';
  $('#mealIngredients').value = '';
  $('#reactionLevel').value = 'start'; // window.render();

  return false;
};

var MealForm = function MealForm(props) {
  return React.createElement("form", {
    id: "mealForm",
    onSubmit: handleMeal,
    name: "mealForm",
    action: "/maker",
    method: "POST",
    className: "mainForm"
  }, React.createElement("input", {
    className: "textBox add",
    id: "mealName",
    type: "text",
    name: "name",
    placeholder: "Meal / Food Name"
  }), React.createElement("input", {
    className: "textBox add",
    id: "mealIngredients",
    type: "text",
    name: "ingredients",
    placeholder: "List Ingredients w/ commas"
  }), React.createElement("select", {
    className: "selectBox",
    id: "reactionLevel",
    name: "level"
  }, React.createElement("option", {
    selected: "selected",
    disabled: "disabled",
    value: "start"
  }, "Rate the reaction:"), React.createElement("option", {
    value: "Urgent Care"
  }, "Urgent Care"), React.createElement("option", {
    value: "Painful"
  }, "Painful"), React.createElement("option", {
    value: "Mild Discomfort"
  }, "Mild Discomfort"), React.createElement("option", {
    value: "No Pain"
  }, "No Pain")), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("button", {
    className: "formSubmit",
    type: "submit",
    id: "addButton"
  }, "Submit"));
};

var MealList = function MealList(props) {
  if (props.meals.length === 0) {
    return React.createElement("div", {
      className: "mealList"
    }, React.createElement("h3", {
      className: "empty"
    }, "No Meals Yet"));
  }

  var mealNodes = props.meals.map(function (meal) {
    return React.createElement("div", {
      className: "meal"
    }, React.createElement("div", {
      className: "card mb-4",
      id: "mealCard",
      onclick: "showData()"
    }, React.createElement("div", {
      className: "card-body",
      key: meal._id
    }, React.createElement("h2", {
      className: "card-title"
    }, meal.name), React.createElement("p", {
      className: "card-text",
      id: "ingred"
    }, meal.ingredients), React.createElement("p", {
      className: "card-text"
    }, "Reaction: ", meal.level)), React.createElement("div", {
      className: "card-footer text-muted",
      id: "foodFooter"
    }, meal.date)));
  });
  return React.createElement("div", {
    className: "mealList"
  }, mealNodes);
};

var loadMealsFromServer = function loadMealsFromServer() {
  sendGenericAjax('GET', '/getMeals', null, function (data) {
    ReactDOM.render(React.createElement(MealList, {
      meals: data.meals
    }), document.querySelector("#meals"));
  });
};

var handleChangePass = function handleChangePass(e) {
  e.preventDefault();
  $('#error').fadeOut(200);

  if ($('#oldPass').val() == '' || $('#newPass1').val() == '' || $('#newPass2').val() == '') {
    handleError('All fields are required');
    return false;
  }

  if ($('#newPass1').val() !== $('#newPass2').val()) {
    handleError('Passwords do not match');
    return false;
  }

  $('#error').fadeIn(200);
  /* Otherwise continue loading new page */

  sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), function (data) {
    handleSuccess('Password changed');
  });
  return false;
};

var handleSubChange = function handleSubChange(e) {
  e.preventDefault();
  $('#subError').fadeOut(200);
  /* Otherwise continue loading new page */

  sendAjaxWithCallback($('#changeSubscription').attr('action'), $('#changeSubscription').serialize(), function (data) {
    handleSubSuccess('Subscription changed');
  });
  return false;
};

var handleUnsubscribe = function handleUnsubscribe(e) {
  e.preventDefault();
  $('#subError').fadeOut(200);
  /* Otherwise continue loading new page */

  sendAjaxWithCallback($('#unsubscribe').attr('action'), $('#unsubscribe').serialize(), function (data) {
    handleSubSuccess('Unsubscribed');
  });
  return false;
};

var ChangePassForm = function ChangePassForm(props) {
  // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
  return React.createElement("form", {
    id: "changePassword",
    name: "changePassword",
    action: "/changePassword",
    method: "POST",
    "class": "mealForm",
    onSubmit: handleChangePass
  }, React.createElement("input", {
    className: "textBox add",
    id: "oldPass",
    type: "text",
    name: "oldPassword",
    placeholder: "Old Password"
  }), React.createElement("input", {
    className: "textBox add",
    id: "newPass1",
    type: "text",
    name: "newPass1",
    placeholder: "New Password"
  }), React.createElement("input", {
    className: "textBox add",
    id: "newPass2",
    type: "text",
    name: "newPass2",
    placeholder: "Repeat New Password"
  }), React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Change Password"
  }), React.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    id: "error"
  }, "Error"), React.createElement("div", {
    className: "alert alert-success",
    role: "alert",
    id: "success"
  }, "Success"));
};

var ChangeSubscribeButton = function ChangeSubscribeButton(props) {
  return React.createElement("form", {
    id: "changeSubscription",
    name: "changeSubscription",
    action: "/changeSubscription",
    method: "POST",
    onSubmit: handleSubChange
  }, React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Subscribe"
  }), React.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    id: "subError"
  }, "Subscribe Error"), React.createElement("div", {
    className: "alert alert-success",
    role: "alert",
    id: "subSuccess"
  }, "Subscribe Success"));
};

var UnsubscribeButton = function UnsubscribeButton(props) {
  return React.createElement("form", {
    id: "unsubscribe",
    name: "unsubscribe",
    action: "/unsubscribe",
    method: "POST",
    onSubmit: handleUnsubscribe
  }, React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Unsubscribe"
  }), React.createElement("div", {
    className: "alert alert-danger",
    role: "alert",
    id: "subError"
  }, "Subscribe Error"), React.createElement("div", {
    className: "alert alert-success",
    role: "alert",
    id: "subSuccess"
  }, "Subscribe Success"));
};

var setupPassChangeForm = function setupPassChangeForm(csrf) {
  ReactDOM.render(React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#changePassForm"));
  console.log($('#subLabel')[0].innerHTML);

  if ($('#subLabel')[0].innerHTML === "Subscribed: false") {
    //console.log($('#subLabel')[0].firstChild);
    ReactDOM.render(React.createElement(ChangeSubscribeButton, {
      csrf: csrf
    }), document.querySelector("#changeSubscribe"));
  } else if ($('#subLabel')[0].innerHTML === 'Subscribed: true') {
    ReactDOM.render(React.createElement(UnsubscribeButton, {
      csrf: csrf
    }), document.querySelector("#changeSubscribe"));
  }
};

var setup = function setup(csrf) {
  ReactDOM.render(React.createElement(MealForm, {
    csrf: csrf
  }), document.querySelector("#addFood"));
  ReactDOM.render(React.createElement(MealList, {
    meals: []
  }), document.querySelector("#meals"));
  loadMealsFromServer();
};

var getToken = function getToken(url) {
  sendGenericAjax('GET', '/getToken', null, function (result) {
    if (window.location.href.indexOf("maker") > -1) {
      setup(result.csrfToken);
    }

    if (window.location.href.indexOf("account") > -1) {
      setupPassChangeForm(result.csrfToken);
    }
  });
};

$(document).ready(function () {
  /* https://www.w3docs.com/snippets/javascript/how-to-get-current-url-in-javascript.html */
  getToken();
});
/* eslint-disable no-undef */

/* eslint-disable linebreak-style */

var handleError = function handleError(message) {
  $('#error').text = message;
  $('#error').fadeIn(200);
};

var handleSuccess = function handleSuccess(message) {
  $('#success').text = message;
  $('#success').fadeIn(200);
};

var handleSubSuccess = function handleSubSuccess(message) {
  $('#subSuccess').text = message;
  $('#subSuccess').fadeIn(200);
};

var redirect = function redirect(response) {
  $('#error').fadeOut(200);
  window.location = response.redirect;
};
/* Sends Ajax request */


var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: function success(result, status, xhr) {
      $('#error').fadeOut(200);
      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendGenericAjax = function sendGenericAjax(method, action, data, callback) {
  $.ajax({
    cache: false,
    type: method,
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, _error2) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};

var sendAjaxWithCallback = function sendAjaxWithCallback(action, data, callback) {
  $.ajax({
    cache: false,
    type: 'POST',
    url: action,
    data: data,
    dataType: 'json',
    success: callback,
    error: function error(xhr, status, error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};