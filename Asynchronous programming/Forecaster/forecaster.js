function attachEvents(){
    $('#submit').click(submitData);
    function submitData(){
        let city = $('#location').val();
        $('#forecast').css('display','inline'); // vissable
        let cityCode = null;
        $.ajax({
            method: 'get',
            url: `https://judgetests.firebaseio.com/locations.json`,
            success: function(data){
                for (let i = 0; i < data.length; i++) {
                    let element = data[i];
                    if(element.name === city){
                        cityCode = element.code;
                        break;
                    }
                }
            },
            error: function(err){
                console.log(err);
            },
            complete:function(){
                // second ajax call
                $.ajax({
                    method: 'get',
                    url: `https://judgetests.firebaseio.com/forecast/today/${cityCode}.json`,
                    success: function(data){
                       let weather = getLogo(data.forecast.condition);
                       $('#current').empty();
                       $('#current').append(`<span class="condition symbol">${weather}</span>`);
                       $('#current').append(`<span class="condition"><span class="forecast-data">`
                       +`${data.name}</span><span class="forecast-data">`
                       +`${getFormatTempAmplitued(data.forecast)}`
                       +`</span><span class="forecast-data">`
                       +`${data.forecast.condition}</span></span>`);
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete:function(){
                        // third ajax call
                        $.ajax({
                            method: 'get',
                            url: `https://judgetests.firebaseio.com/forecast/upcoming/${cityCode}.json`,
                            success: function(data){
                                $('#upcoming').empty();
                              
                                let arr = data.forecast;
                                for (let i = 0; i < data.forecast.length; i++) {
                                    let currentElement = arr[i];
                                    let icon = getLogo(currentElement.condition);

                                    $('#upcoming').append(`<span class="upcomming">`
                                        +`<span class="symbol">${icon}</span>`
                                        +`<span class="forecast-data">${getFormatTempAmplitued(currentElement)}</span>`
                                        +`<span class="forecast-data">${currentElement.condition}</span>`
                                        +`</span>`);
                                }
                            },
                            error: function(err){
                                console.log(err);
                            },
                        });

                    }
                })
            }
        });
    }   
}
function getLogo(weather){
    if('Sunny' === weather){
        return '&#x2600;';
    }
    if('Partly sunny' === weather){
        return '&#x26C5;';
    }
    if('Overcast' === weather){
        return '&#x2601;';
    }
    if('Rain' === weather){
        return '&#x2614; ';
    }
    return '';
}
function getFormatTempAmplitued(currentForecast){
    return `${currentForecast.low}&#176;/${currentForecast.high}&#176;`;
}