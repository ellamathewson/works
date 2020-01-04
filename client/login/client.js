/* eslint-disable linebreak-style */
const handleLogin = (e) => {
    e.preventDefault();
    $('#error').fadeOut(200);
  
    /* If either of the fields are blank show error */
    if ($('#user').val() == '' || $('#pass').val() == '') {
      handleError('Username or password is empty');
      return false;
    }

    console.log($('input[name=_csrf]').val());
  
    /* Otherwise continue loading new page */
    sendGenericAjax('POST', $('#loginForm').attr('action'), $('#loginForm').serialize(), redirect);
  
    return false;
  };
  
  const handleSignup = (e) => {
    e.preventDefault();
    $('#error').fadeOut(200);
  
    /* If any input is empty, show error */
    if ($('#user').val() == '' || $('#pass').val() == '' || $('#pass2').val() == '') {
      handleError('All fields are required');
      return false;
    }
  
    /* If the passwords do not match, show error */
    if ($('#pass').val() !== $('#pass2').val()) {
      handleError('Passwords do not match');
      return false;
    }
  
    /* Otherwise continue loading new page */
    sendGenericAjax('POST', $('#signupForm').attr('action'), $('#signupForm').serialize(), redirect);
  
    return false;
  };
  
  const LoginWindow = (props) => {
      return (
      <form id="loginForm" name="loginForm" 
          onSubmit={handleLogin} action="/login" 
          method="POST" className="mainForm">
          <input className="textBox" id="user" type="text" name="username" placeholder="Username" />
          <input className="textBox" id="pass" type="password" name="pass" placeholder="Password" />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <button className="formSubmit" type="submit" id="signinButton">Sign In </button>
      </form>
      );
  };
  
  const SignupWindow = (props) => {
    return (
      <form id="signupForm" name="signupForm" 
      onSubmit={handleSignup} action="/signup" 
      method="POST" className="mainForm">
        <input className="textBox" id="user" type="text" name="username" placeholder="Username"/>
        <input className="textBox" id="pass" type="password" name="pass" placeholder="Password"/>
        <input className="textBox" id="pass2" type="password" name="pass2" placeholder="Retype password"/>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
    );
  };

  const createLoginWindow = (csrf) => {
    ReactDOM.render(
      <LoginWindow csrf={csrf} />,
      document.querySelector("#content")
    );
  };
  
  const createSignupWindow = (csrf) => {
    ReactDOM.render(
      <SignupWindow csrf={csrf} />,
      document.querySelector("#content")
    );
  };
  
  const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
  
    signupButton.addEventListener("click", (e) => {
      e.preventDefault();
      createSignupWindow(csrf);
      return false;
    });
  
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      createLoginWindow(csrf);
      return false;
    });
  
    // createNavBar();
    createLoginWindow(csrf);
  };
  
  const getToken = () => {
    sendGenericAjax('GET', '/getToken', null, (result) => {
      setup(result.csrfToken);
    });
  };
  
  $(document).ready(function() {
    getToken();
  });
