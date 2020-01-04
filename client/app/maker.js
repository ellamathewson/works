/* eslint-disable linebreak-style */
const handleMeal = (e) => {
  e.preventDefault();

  $('#error').fadeIn(300);

  if ($('#mealName').val() == '' || $('#mealIngredients').val() == '' || $('#reactionLevel').val() == '') {
    handleError('All fields are required');
    return false;
  }

  sendGenericAjax('POST', $('#mealForm').attr('action'), $('#mealForm').serialize(), () => {
      loadMealsFromServer();
  });
  console.log($('#mealName').val);
    $('#mealName').value = '';
    $('#mealIngredients').value = '';
    $('#reactionLevel').value = 'start';
    // window.render();
  return false;
};

const MealForm = (props) => {
    return (
    <form id="mealForm" onSubmit={handleMeal}
        name="mealForm" action="/maker"
        method="POST" className="mainForm">
        <input className="textBox add" id="mealName" type="text" name="name" placeholder="Meal / Food Name" />
        <input className="textBox add" id="mealIngredients" type="text" name="ingredients" placeholder="List Ingredients w/ commas" />
        <select className="selectBox" id="reactionLevel" name="level">
            <option selected="selected" disabled="disabled" value="start">Rate the reaction:</option>
            <option value="Urgent Care">Urgent Care</option>
            <option value="Painful">Painful</option>
            <option value="Mild Discomfort">Mild Discomfort</option>
            <option value="No Pain">No Pain</option>
        </select>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <button className="formSubmit" type="submit" id="addButton">Submit</button>
    </form>
    );
};

const MealList = function(props) {
    if(props.meals.length === 0) {
        return (
          <div className="mealList">
              <h3 className="empty">No Meals Yet</h3>
          </div>
        );
    }

    const mealNodes = props.meals.map(function(meal) {
        return (
        <div className="meal">
          <div className="card mb-4" id="mealCard" onclick="showData()">
            <div className="card-body" key={meal._id}>
              <h2 className="card-title">{meal.name}</h2>
              <p className="card-text" id="ingred">{meal.ingredients}</p>
              <p className="card-text">Reaction: {meal.level}</p>
            </div>
            <div className="card-footer text-muted" id="foodFooter">
              {meal.date}
            </div>
          </div>
         </div>
        );
    });

    return (
        <div className="mealList">
            {mealNodes}
        </div>
    );
};

const loadMealsFromServer = () => {
    sendGenericAjax('GET', '/getMeals', null, (data) => {
        ReactDOM.render(
            <MealList meals={data.meals} />, document.querySelector("#meals")
        );
    });
};

const handleChangePass = (e) => {
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
    sendAjaxWithCallback($('#changePassword').attr('action'), $('#changePassword').serialize(), (data) => {
      handleSuccess('Password changed');
    });
  
    return false;
  };

  const handleSubChange = (e) => {
    e.preventDefault();
    $('#subError').fadeOut(200);
    
    /* Otherwise continue loading new page */
    sendAjaxWithCallback($('#changeSubscription').attr('action'), $('#changeSubscription').serialize(), (data) => {
      handleSubSuccess('Subscription changed');
    });
    return false;
  };

  const handleUnsubscribe = (e) => {
    e.preventDefault();
    $('#subError').fadeOut(200);
    
    /* Otherwise continue loading new page */
    sendAjaxWithCallback($('#unsubscribe').attr('action'), $('#unsubscribe').serialize(), (data) => {
      handleSubSuccess('Unsubscribed');
    });
    return false;
  }
  
  const ChangePassForm = (props) => {
    // webkit text security from https://stackoverflow.com/questions/1648665/changing-the-symbols-shown-in-a-html-password-field -->
    return (
      <form id="changePassword" name="changePassword" 
      action="/changePassword" method="POST" 
      class="mealForm" onSubmit={handleChangePass}>
        <input className="textBox add" id="oldPass" type="text" name="oldPassword" placeholder="Old Password" />
        <input className="textBox add" id="newPass1" type="text" name="newPass1" placeholder="New Password" />
        <input className="textBox add" id="newPass2" type="text" name="newPass2" placeholder="Repeat New Password" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Change Password" />
        <div className="alert alert-danger" role="alert" id="error">Error</div>
        <div className="alert alert-success" role="alert" id="success">Success</div>
    </form>
    )
  };

  const ChangeSubscribeButton = (props) => {
      return (
        <form id="changeSubscription" name="changeSubscription" 
        action="/changeSubscription" method="POST" 
        onSubmit={handleSubChange}>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Subscribe" />
        <div className="alert alert-danger" role="alert" id="subError">Subscribe Error</div>
        <div className="alert alert-success" role="alert" id="subSuccess">Subscribe Success</div>
        </form>
      )
  };

  const UnsubscribeButton = (props) => {
    return (
        <form id="unsubscribe" name="unsubscribe" 
        action="/unsubscribe" method="POST" 
        onSubmit={handleUnsubscribe}>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Unsubscribe" />
        <div className="alert alert-danger" role="alert" id="subError">Subscribe Error</div>
        <div className="alert alert-success" role="alert" id="subSuccess">Subscribe Success</div>
        </form>
      )
  }

const setupPassChangeForm = function(csrf) {
    ReactDOM.render(
        <ChangePassForm csrf={csrf} />, document.querySelector("#changePassForm")
    );
        console.log($('#subLabel')[0].innerHTML);
    if($('#subLabel')[0].innerHTML === "Subscribed: false") {
        //console.log($('#subLabel')[0].firstChild);
        ReactDOM.render(
            <ChangeSubscribeButton csrf={csrf} />, document.querySelector("#changeSubscribe")
        );
    } else if($('#subLabel')[0].innerHTML === 'Subscribed: true') {
        ReactDOM.render(
            <UnsubscribeButton csrf={csrf} />, document.querySelector("#changeSubscribe")
        );
    }    
};

const setup = function(csrf) {
    ReactDOM.render(
        <MealForm csrf={csrf} />, document.querySelector("#addFood")
    );

    ReactDOM.render(
        <MealList meals={[]} />, document.querySelector("#meals")
    );

    loadMealsFromServer();
};

const getToken = (url) => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
        if(window.location.href.indexOf("maker") > -1) {
            setup(result.csrfToken);
        }
        if(window.location.href.indexOf("account") > -1) {
            setupPassChangeForm(result.csrfToken);
        }
        
    });
};

$(document).ready(function() {
    /* https://www.w3docs.com/snippets/javascript/how-to-get-current-url-in-javascript.html */
    getToken();
});