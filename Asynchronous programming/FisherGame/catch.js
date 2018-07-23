const URL = 'https://baas.kinvey.com/appdata/kid_Skz-pJ0Qm/messages';
const USER_NAME = 'pingvin_8@mail.bg';
const PASSWORD = '883368107754';
class Angler {
    constructor(angler, weight, species, location, bait, captureTime,id) {
        this._id = id;
        this.angler = angler;
        this.weight = weight;
        this.species = species;
        this.location = location;
        this.bait = bait;
        this.captureTime = captureTime;
    }
}
function attachEvents(){
    $(document).on('click','.update',update);
    $(document).on('click','.delete',del);
    $('.load').click(load);
    $('.add').click(add);
}
function update(){
    let currentForm = this.parentElement;
    let id = this.parentElement.getAttribute("data-id");
    let angler = getAnglerData($(currentForm));
    angler._id = id;
    jQuery.ajax({
        method: 'PUT',
        url: URL+`/${id}`,
        headers: {
            "Authorization": "Basic " + btoa(USER_NAME + ":" + PASSWORD)
        },
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(angler),
        success: function(data){
            load();
        }
    });
}
function getAnglerData(currentForm){
    let angler = currentForm.find('.angler').val();
    let weight = currentForm.find('.weight').val();
    let species = currentForm.find('.species').val();
    let location = currentForm.find('.location').val();
    let bait = currentForm.find('.bait').val();
    let captureTime = currentForm.find('.captureTime').val();
    return new Angler(angler, weight, species, location, bait, captureTime);
}
function del(){
    let currentForm = this.parentElement;
    let id = this.parentElement.getAttribute("data-id");
    jQuery.ajax({
        method: 'DELETE',
        url: URL+`/${id}`,
        headers: {
            "Authorization": "Basic " + btoa(USER_NAME + ":" + PASSWORD)
        },
        success: function(data){
            load();
        }
    });
}
function load(){
    $('#main').remove();
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
    let newAngler = getAnglerData($('#addForm'));
    $.ajax({
        method: "POST",
        url: URL,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        headers: {
            "Authorization": "Basic " + btoa(USER_NAME + ":" + PASSWORD)
        },
        data: JSON.stringify(newAngler),
        success: function(respond){
            load();
        },
        error: function(error){
            console.log(error);
        }
    });
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