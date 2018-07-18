function attachEvents(){
    let url = 'https://messengerprototype.firebaseio.com/.json';

    $( "#submit" ).click(function() {
        let author = $('#author').val();
        let text = $('#content').val();
        let postData = JSON.stringify({
            'author': author,
            'content': text,
            'timestamp': Date.now()
        });
        $.ajax({
            method: 'post',
            url,
            data: postData,
            success: succesful,
            error: handleError
        })
        function handleError(error){
            console.log(error);
        }
        function succesful(res){
            refresh();
         }
    });
    let refresh = function() {
        $('#messages').empty();
        $.ajax({
            method: 'get',
            url,
            success: displayMessages,
            error: displayError
        });
        function displayMessages(respond){
            for (let key in respond) {
                let author = respond[key].author;
                let content = respond[key].content;
                $('#messages').append(author + ': ' + content + '\n');
            }
        }
        function displayError(error){
            console.log(error);
        }
    }
    $( "#refresh" ).click(refresh);
}