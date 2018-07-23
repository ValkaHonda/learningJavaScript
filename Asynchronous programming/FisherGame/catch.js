const URL = 'https://baas.kinvey.com/appdata/kid_Skz-pJ0Qm/messages';
const USER_NAME = 'pingvin_8@mail.bg';
PASSWORD = '883368107754';

function attachEvents(){
    $('.update').click(update);
    $('.delete').click(del);
    $('.load').click(load);
    $('.add').click(add);
}
function update(){
    console.log('update function');
}
function del(){
    console.log('delete function');
}
function load(){
    $('#catches').empty();
    $.ajax({
        method: 'get',
        url: URL,
        headers: {
            "Authorization": "Basic " + btoa(USER_NAME + ":" + PASSWORD)
        },
        success: function(respond){
            createAnglerFrame();
            for(let i = 0; i < respond.length; i++){
                let angler = respond[i];
                addAnglerView(angler);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}
function add(){
    console.log('add function');
}

function addAnglerView(angler){
    $('#catches').append(`<div class="catch" data-id="${angler._id}">
    <label>Angler</label>
    <input type="text" class="angler" value="${angler.angler}"/>
    <label>Weight</label>
    <input type="number" class="weight" value="${angler.weight}"/>
    <label>Species</label>
    <input type="text" class="species" value="${angler.species}"/>
    <label>Location</label>
    <input type="text" class="location" value="${angler.location}"/>
    <label>Bait</label>
    <input type="text" class="bait" value="${angler.bait}"/>
    <label>Capture Time</label>
    <input type="number" class="captureTime" value="${angler.captureTime}"/>
    <button class="update">Update</button>
    <button class="delete">Delete</button>
    </div>`
    );
}
function createAnglerFrame(){
    $('#heading').after(`<fieldset id="main"><legend>Catches</legend>
    <div id="catches">
    </div></fieldset>`);
}