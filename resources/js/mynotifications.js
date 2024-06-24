document.addEventListener('DOMContentLoaded', (event) => {
  const accessToken = localStorage.getItem('accessToken'); // Retrieve accessToken from localStorage
  const notificationsList = document.querySelector('.notifications-list-container');

  function displayNoNotifications() {
    notificationsList.innerHTML = '<li>No notifications available</li>';
  }

  if (!accessToken) {
    console.warn('Access token not found. Displaying no notifications message.');
    displayNoNotifications();
    return;
  }

  async function fetchNotifications() {
    if (!sessionStorage.getItem('favorites')) {
      sessionStorage.setItem('favorites', JSON.stringify([])); // Initialize as an empty array
    }
    const favorites = JSON.parse(sessionStorage.getItem('favorites'));
    console.log(JSON.stringify(favorites));
    const result = await fetch('/user/notifications', {
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favorites }),
    });

    resultJson = await result.json();

    if (result.status < 300 && result.status >= 200) {
      console.log(resultJson.message);
      displayNotifications(resultJson.notifications);
    } else {
      console.error('Error fetching notifications:', error);
      displayNoNotifications();
    }
  }


  function displayNotifications(notifications) {
    notificationsList.innerHTML = '';
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

  fetchNotifications();
});
