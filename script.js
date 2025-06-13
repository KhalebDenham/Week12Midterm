const API_SHORTCUT = ""; //API shortcut for URL
















//Get function
$(document).ready(function () {
  const getUsers = () => {
    console.log("Getting all users from API");
    return $.get(`${API_SHORTCUT}/user`);
  };

  const renderData = () => {
    //takes the data from getUsers and logs the data

    getUsers().then((data) => {
      for (let user of users) {
        //Prepends by Iterating each user in the array of users and adding their information to the table with id tBody from html file
        $("#tBody").prepend(`
                <tr> 
                    <td>${user.name}</td>
                    <td>${user.jobTitle}</td>
                    <td>${user.companyName}</td>
                    <td><button class="btn btn-danger">Delete User</button></td>
                </tr>
                    `);
      }
    });
  };
});
