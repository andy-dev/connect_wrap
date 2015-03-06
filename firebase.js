var connectMore = new Firebase("https://luminous-inferno-9321.firebaseio.com");
//SAVE DATA
connectMore.set({ name: "Alex Wolfe" });
//LISTEN FOR REALTIME CHANGES
connectMore.on("value", function(data) {
  var name = data.val() ? data.val().name : "";
  alert("My name is " + name);
});