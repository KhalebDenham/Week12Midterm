const API_SHORTCUT = ""; //API shortcut for URL

$(document).ready(function () {
  const getUsers = () => {
    console.log("Getting all users from API");
    return $.get(`${API_SHORTCUT}/user`);
  };

  //Function that posts a new user
  const postUser = (event) => {
    event.preventDefault();
    //create an object
    const userObject = {
      name: $("#fullName"),
      jobTitle: $("#jobTitle"),
      companyName: $("#companyName"),
    };
    console.log(userObject);
  };

  //Delete User Method
  const deleteUser = (id) => {
    //feed the
    console.log("Deleting user...");
    $.ajax({
      type: "DELETE",
      url: `${API_SHORTCUT}/user/${id}`,
      success: getUsers().done(renderData()),
    });
  };

  const renderData = () => {
    //takes the data from getUsers and logs the data

    //Get function
    getUsers().then((data) => {
      for (let user of users) {
        //Prepends by Iterating each user in the array of users and adding their information to the table with id tBody from html file
        $("#tBody").prepend(`
                <tr> 
                    <td>${user.name}</td>
                    <td>${user.jobTitle}</td>
                    <td>${user.companyName}</td>
                    <td><button id="delete ${user.id}" class="btn btn-danger">Delete User</button></td>
                </tr>
       
       
       
                `);
        //Add an event listener for every delete button..pass in their user id so we can use that user.id as target in our function
        $(`#delete${user.id}`).click(() => deleteUser(user.id));
      }
    });
  };

  //Event Listener
  $("#formSubmit").click(postUser);

  renderData();
});
