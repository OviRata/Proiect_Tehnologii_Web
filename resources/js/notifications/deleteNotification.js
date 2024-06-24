const deleteNotification = async (notificationId) =>{

  console.log('not id : '+notificationId);

  const result = await fetch(
    '/user/notifications',
    {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'notificationid':notificationId
      }
    }
  )
  resultJson = await result.json();

  if(result.status < 300 && result.status>=200){
    console.log(resultJson.message);
    location.reload();
  }
  else{
    console.error(resultJson.error);
  }

}
