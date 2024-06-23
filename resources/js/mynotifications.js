document.addEventListener('DOMContentLoaded', (event) => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
  const notificationsList = document.querySelector('.notifications-list-container');

  // Function to display "No notifications" message
  function displayNoNotifications() {
    notificationsList.innerHTML = '<li>No notifications available</li>';
  }

  if (!accessToken) {
    console.warn('Access token not found. Displaying no notifications message.');
    displayNoNotifications();
    return;
  }

  // Function to fetch notifications from the server
  async function fetchNotifications() {
    const result = await fetch(
      '/user/notifications',
      {
        method: 'GET',
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
          'Content-Type': 'application/json'
        }
      }
    )

    resultJson = await result.json();

    if (result.status < 300 && result.status >= 200) {
      console.log(resultJson.message);
      displayNotifications(resultJson.notifications);
    } else {
      console.error('Error fetching notifications:', error);
      displayNoNotifications();
    }
  }

  // Function to display notifications
  function displayNotifications(notifications) {
    notificationsList.innerHTML = ''; // Clear existing notifications
    let currentNumber=0;
    notifications.forEach(notification => {
      currentNumber++;
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <div class="notification">
                    <div class="notification-icon">
                        <img src="../../resources/notification-icon.png" alt="Notification Icon">
                    </div>
                    <div class="notification-content">
                        <p>${notification.content}</p>
                        <h1 style="display:none">${notification._id}</h1>

                        <span class="notification-time">${notification.createdAt}</span>
                    </div>
                    <button class = 'delete-btn' onclick="
                        (async ()=>{
                          await deleteNotification('${notification._id}');
                        })();
                     "  >
                        X
                    </button>

                </div>
            `;
      notificationsList.appendChild(listItem);
    });
  }

  // Fetch and display notifications on page load
  fetchNotifications();
});
