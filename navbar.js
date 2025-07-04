
function findCenter(){
    return (bgWidth/5)/2 - player.width/2;
}
function home(){
    player.x = (bgWidth/5)/2;
    player.y = 0;
}

function projects(){
    player.x = (bgWidth/5) + findCenter();
    player.y = 0;
}

function blog(){
    player.x = (bgWidth/5) * 2 + findCenter();
    player.y = 0;
}

function about(){
    player.x = (bgWidth/5) * 3 + findCenter();
    player.y = 0;
}

function contact(){
    player.x = (bgWidth/5) * 4 + findCenter();
    player.y = 0;
}