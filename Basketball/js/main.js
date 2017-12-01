var score = 0;
var clickTimer = null;
var timeout;
var lastTap = 0;
var attempts = 0;

jQuery.event.special.dblclick = {
    setup: function(data, namespaces) {
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0 || agent.indexOf('ipod') >= 0) {
            var elem = this,
                $elem = jQuery(elem);
            $elem.bind('touchend.dblclick', jQuery.event.special.dblclick.handler);
        } else {
            var elem = this,
                $elem = jQuery(elem);
            $elem.bind('click.dblclick', jQuery.event.special.dblclick.handler);
        }
    },
    teardown: function(namespaces) {
        var agent = navigator.userAgent.toLowerCase();
        if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0 || agent.indexOf('ipod') >= 0) {
            var elem = this,
                $elem = jQuery(elem);
            $elem.unbind('touchend.dblclick');
        } else {
            var elem = this,
                $elem = jQuery(elem);
            $elem.unbind('click.dblclick', jQuery.event.special.dblclick.handler);
        }
    },
    handler: function(event) {
        var elem = event.target,
            $elem = jQuery(elem),
            lastTouch = $elem.data('lastTouch') || 0,
            now = new Date().getTime();
        var delta = now - lastTouch;
        if (delta > 20 && delta < 500) {
            $elem.data('lastTouch', 0);
            $elem.trigger('dblclick');
        } else {
            $elem.data('lastTouch', now);
        }
    }
};

    $(document).ready(function() {
        
          $('#myCanvas').click(function(e) {
          
            var offset = $(this).offset();
            var currentTime = new Date().getTime();
            var tapLength = currentTime - lastTap;
            clearTimeout(timeout);
            increaseAttempts();
            if (tapLength < 500 && tapLength > 0) {
                 
              drawCircle(e.pageX-offset.left, e.pageY - offset.top, 'green');
              increaseScore();
              e.preventDefault();
              decreaseAttempt();
            }
            else
            {
            
              timeout = setTimeout(function() {
              var prevX = e.pageX-offset.left;
              var prevY = e.pageY - offset.top;
              drawCircle(prevX, prevY, 'red');
              
              clearTimeout(timeout);
            }.bind(this), 500);
          }
          lastTap = currentTime;
  
        });
          
          
          $("#clear").click(function(){
            clearCanvas();
          });
    });
        


        
        function drawCircle(x,y, color) {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 5;
      
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = color;
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#003300';
            context.stroke();
        }
        
        function drawInitCircle() {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 30;
      
            context.beginPath();
            context.arc(centerX, 50, radius, 0, 2 * Math.PI, false);
            
            context.lineWidth = 5;
            context.strokeStyle = '#003300';
            context.stroke();
        }
        
        function drawInitLine()
        {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var quarterX = canvas.width / 4;
            var centerX = canvas.width/2;
            var centerY = canvas.height / 2;
            var threequarterX = quarterX + centerX;
            context.beginPath();
            context.lineWidth=2;
            context.moveTo(quarterX, 0);
            context.lineTo(quarterX, centerY);
            context.stroke();
            
            context.beginPath();
            context.lineWidth=2;
            context.moveTo(threequarterX, 0);
            context.lineTo(threequarterX, centerY);
            context.stroke();
            
            context.beginPath();
            context.lineWidth=2;
            context.moveTo(quarterX, centerY);
            context.lineTo(threequarterX, centerY);
            context.stroke();
            
            context.beginPath();
            context.arc(centerX, centerY, quarterX, 0, Math.PI, false);
            context.lineWidth = 2;
            context.stroke();
        }
        
        
        
        
         function resize_canvas(){
            canvas = document.getElementById("myCanvas");
            if (canvas.width  < window.innerWidth)
            {
                canvas.width  = window.innerWidth;
            }

            if (canvas.height < window.innerHeight)
            {
                canvas.height = window.innerHeight;
            }
        }
        
        function increaseScore() {
            
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var xCoordinate = 25;
            var yCoordinate = canvas.height-25;
            context.font = 'Normal 12pt Arial';
            context.fillStyle = '#ffc44f'; // or whatever color the background is.
            var oldText = "Score: " + score;
            context.fillText(oldText, xCoordinate, yCoordinate);
            context.fillStyle = '#000000'; // or whatever color the text should be.
            score+=2;
            var newText = "Score: " + score;
            context.fillText(newText, xCoordinate, yCoordinate);
            
        }
        
        
         function increaseAttempts() {
            
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var xCoordinate = canvas.width-120;
            var yCoordinate = canvas.height-25;
            context.font = 'Normal 12pt Arial';
            context.fillStyle = '#ffc44f'; // or whatever color the background is.
            var oldText = "Attempts: " + attempts;
            context.fillText(oldText, xCoordinate, yCoordinate);
            context.fillStyle = '#000000'; // or whatever color the text should be.
            attempts+=1;
            var newText = "Attempts: " + attempts;
            context.fillText(newText, xCoordinate, yCoordinate);
            
        }
        
        function decreaseAttempt() {
            
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            var xCoordinate = canvas.width-120;
            var yCoordinate = canvas.height-25;
            context.font = 'Normal 12pt Arial';
            context.fillStyle = '#ffc44f'; // or whatever color the background is.
            var oldText = "Attempts: " + attempts;
            context.fillText(oldText, xCoordinate, yCoordinate);
            context.fillStyle = '#000000'; // or whatever color the text should be.
            attempts-=1;
            var newText = "Attempts: " + attempts;
            context.fillText(newText, xCoordinate, yCoordinate);
            
        }
        
        function clearCanvas() {
            var canvas = document.getElementById('myCanvas');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawInitLine();
            drawInitCircle();
            score=0;
            attempts = 0;
            
        }