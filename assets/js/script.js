//wroted by amirhosein nazari

//Global values
var pos = { x: 0, y: 0 };
var output;
var canvas;
var ctx;
var button;
var download;
var png_file_name;
const mouse_pos_x = -10;
const mouse_pos_y = -54;
//.............................
var size = 3;
// this is defult size of brush 



function onload() {
    output = document.getElementById('container');
    canvas = document.getElementById('painter');
    //  button = document.getElementById('btn-download');

    ctx = canvas.getContext('2d');
    canvas.height = 700;
    canvas.width = 700;
    ctx.fillStyle = "white";
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousemove', sPos);
    canvas.addEventListener('mouseenter', sPos);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    download = document.getElementById('download');
    download.addEventListener('click', function () {
        png_file_name = document.querySelector('#filename').value;
        if (!png_file_name) {
            png_file_name = 'untitled.png';
        } else {

            png_file_name += '.png';
        }
        download_canvas(canvas, png_file_name);
    }, false);

}


function draw(e) {
    if (e.buttons !== 1) return;
    output.innerHTML = "X= " + pos.x + " Y= " + pos.y;
    ctx.beginPath();
    size = document.querySelector('#brush_size').value;
    // there is two algorithm for design on canvas because the result will be bad if we use 
    // an algorithm for every brush  size 
    try {
        if (size < 1) {
            throw "size cannot be less than 1";
        }
        if (size < 9) {

            ctx.moveTo(pos.x + mouse_pos_x, pos.y + mouse_pos_y);
            color();
            // this function changes the value of pos with new events
            sPos(e);
            ctx.lineTo(pos.x + mouse_pos_x, pos.y + mouse_pos_y);
            ctx.stroke();
        } else {
            ctx.arc(pos.x + mouse_pos_x, pos.y + mouse_pos_y, size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = document.querySelector('#color_pick').value;
            ctx.fill();
        }
    } catch (e) {
        console.log(e);
    }
}

function set_size() {
    ctx.lineWidth = document.querySelector('#brush_size').value;
}

function sPos(e) {
    pos.x = e.pageX;
    pos.y = e.pageY;
    return;
}

function color() {
    ctx.strokeStyle = document.querySelector('#color_pick').value;
}

function reset() {
    try {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return true;
    }
    catch (e) {
        console.log(e.message);
    }
};

//save image part
function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
    console.log(link.download);
}

// download_canvas function wroted by : epistemex 
function download_canvas(c, filename) {

    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'),
        e;

    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;

    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = c.toDataURL();

    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}