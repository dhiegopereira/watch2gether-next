export const createRoom = async() => {
    fetch("https://api.w2g.tv/rooms/create.json", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "w2g_api_key": "zdq8v21fxmkoktttng4zacsfwqsz9az2gxyruqecpco561zgys2wo2hkw0kbmyit",
          "share": "https://www.youtube.com/watch?v=8Wdp35Z-fRs",
          "bg_color": "#00ff00",
          "bg_opacity": "50"
      })
  })
  .then(response => response.json())
  .then(function (data) {
      console.log("W2G: Here is your room! \n https://w2g.tv/rooms/" + data.streamkey);
  });
}