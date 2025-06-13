const API_SHORTCUT = "https://684b3cf9165d05c5d35bead3.mockapi.io/promineo"; //API shortcut for URL

$(document).ready(function () {
  const getUsers = () => {
    console.log("Getting all users from API");
    return $.get(`${API_SHORTCUT}/users`);
  };

  //Delete User Method
  const deleteUser = (id) => {
    console.log("Deleting user...");
    $.ajax({
      type: "DELETE",
      url: `${API_SHORTCUT}/users/${id}`,
      success: function () {
        getUsers().then(renderData);
      },
    });
  };

  //Function that posts a new user
  const postUser = (event) => {
    event.preventDefault();
    //create an object
    const userObject = {
      name: $("#fullName").val(),
      jobTitle: $("#jobTitle").val(),
      company: $("#company").val(),
    };

    $.ajax({
      type: "POST",
      url: `${API_SHORTCUT}/users`,
      data: userObject,
      success: function () {
        getUsers().then(renderData);
      },
    });

    //reset form values

    $("#fullName").val("");
    $("#jobTitle").val("");
    $("#company").val("");
  };

  //function that updates users name

  const updateUser = (user) => {
    user.name = $(`#updateUser${user.id}`).val();

    $.ajax({
      type: "PUT",
      url: `${API_SHORTCUT}/users/${user.id}`,
      data: JSON.stringify(user),
      contentType: "application/json",
      success: function () {
        getUsers().then(renderData);
      },
    });
  };

  const renderData = () => {
    //takes the data from getUsers and logs the data

    //Get function
    getUsers().then((users) => {
      $("#tBody").empty();

      for (let user of users) {
        //Prepends by Iterating each user in the array of users and adding their information to the table with id tBody from html file
        $("#tBody").prepend(`
                <tr> 
                    <td>${user.name}</td>
                    <td>${user.jobTitle}</td>
                    <td>${user.company}</td>
                    <td> <input class="input" type="text" id="updateUser${user.id}"/>
                       <button class="btn btn-info" id="updateButton${user.id}">Update User</button>
                       </td>

                    <td><button id="delete${user.id}" class="btn btn-danger">Delete User</button></td>
                </tr>
       
       
       
                `);
        //Add an event listener for every delete button..pass in their user id so we can use that user.id as target in our function
        $(`#delete${user.id}`).click(() => deleteUser(user.id));

        //Add event listener for every update button, But we pass in entire
        //object this time instead of just the ID\
        $(`#updateButton${user.id}`).click(() => updateUser(user));
      }
    });
  };

  //Event Listener
  $("#formSubmit").click(postUser);

  renderData();
});
