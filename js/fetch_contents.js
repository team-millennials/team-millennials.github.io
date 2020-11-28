function smooth_scrolling(){
    "use strict"; // Start of use strict
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 120)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 156
  });
}
function display_contents(chk,contents){
    var lines = contents.split('\n')

    var html = "";
    var nav_html = "";
    html += "<div class='col-lg-8 mx-auto'>";
    html += "<h1>"+lines[0].trim()+"</h1>"
    
    for (var i=1;i<lines.length;i++){
        if(lines[i].length==0 || lines[i].length==1)
            continue;
        tokens = lines[i].split(":");
        id = tokens[0].trim().replaceAll(/[^a-zA-z]/g,'');
        id 
        console.log(id);
        html += '<div class="container" id ="'+id+'">';
        html = html + "<h3 style='color:#890700;'>"+tokens[0].trim()+"</h3>";
        nav_html = nav_html + '<li class="nav-item">\
            <a class="nav-link js-scroll-trigger" href="#'+id+'">'+tokens[0].trim()+'</a>\
        </li>'
        html += "<div>";
        html += '<iframe src="https://drive.google.com/file/d/'+tokens[1].trim()+'/preview"></iframe>';
        html += "</div>";
        html += '</div>';
        html += "<br/><hr/><br/>";
    }
    html += "</div>";
     nav_html = nav_html + '<li class="nav-item">\
            <a class="nav-link js-scroll-trigger" href="#ProjectLive">Our MVP!!</a>\
        </li>';
    nav_html = nav_html + '<li class="nav-item">\
            <a class="nav-link js-scroll-trigger" href="#author">Team Members</a>\
        </li>';
    document.getElementById("main").innerHTML = html;
    document.getElementById("navcontents").innerHTML = nav_html;
    smooth_scrolling();
}

function get_contents() {
    var clienth=new XMLHttpRequest();
    clienth.open('GET','contents.txt');
    clienth.onreadystatechange = function(){
        if(this.readyState==4 && this.status == 200){
            display_contents(true,clienth.responseText);
        }else{
            display_contents(false,"");
        }
        
    }
    clienth.send();
}
get_contents();

