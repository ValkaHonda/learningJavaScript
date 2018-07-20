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
    console.log('load function');
    $('#catches').empty();
}
function add(){
    console.log('add function');
}