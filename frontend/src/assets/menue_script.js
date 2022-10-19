var menuState = 1 // close
function open_close() {
  if(menuState === 0){
     menuState = 1;
 document.getElementById("sidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      document.getElementById("main").style.borderRadius = "10px";
      document.getElementById("main").style.width = "85%";

  }
  else {
     menuState = 0;
  document.getElementById("sidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
      document.getElementById("main").style.borderRadius = "0";
      document.getElementById("main").style.width = "99%";

  }
}