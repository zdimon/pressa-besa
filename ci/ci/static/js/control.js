$( document ).ready(function() {
   
    $('.git-pull').on('click', (e) => {
        id = $(e.target).attr('data-id');
        $('#git-oper').html('операция: git pull');
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/pull/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });
    

    $('.git-status').on('click', (e) => {
        id = $(e.target).attr('data-id');
        $('#git-oper').html('операция: git status');
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/status/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });
    
    $('.git-push').on('click', (e) => {
        id = $(e.target).attr('data-id');
        $('#git-oper').html('операция: git push');
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/push/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });

    $('.git-diff').on('click', (e) => {
        id = $(e.target).attr('data-id');
        $('#git-oper').html('операция: git diff');
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/diff/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });


    $('.git-commit').on('click', (e) => {
        id = $(e.target).attr('data-id');
        $('#git-oper').html('операция: git commit; git push');
        $('#git-pull-result').html('выполняется....');
        $('#git-pull-error').html('');
        const url = `/git/commit/${id}`;
        $.ajax({
            url: url,
            type: "GET",
            success: (response) => {
                $('#git-pull-result').html(response.output);
                $('#git-pull-error').html(response.erroe);
                console.log(response)
            }
        }); 
    });

});