
  const apiUrl = 'https://43f9-2409-40f2-100f-c645-5ce1-23db-f05d-8a5a.ngrok-free.app/';
  const textData1 = ["ayaan","C:\\Mydrive\\python.vs\\Attendance\\ayaan5.jpg"];
  const textData2 = ["ayaan","C:\\Mydrive\\python.vs\\Attendance\\aditya.png"];

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: textData1 }),
  };
  fetch(apiUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API Response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
