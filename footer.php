<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.5.1.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js"></script>
<?php  
if(isset($_SESSION["logged_in"][0][0]["MANAGER_ID"]) || isset($_SESSION["logged_in"][0][0]["USER_ID"])){
    echo '<script src = "https://code.jquery.com/jquery-1.10.2.js"></script>';
    echo '<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>';
}
?>

<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/js/my_functions.js"></script>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/js/scroll_to_top.js"></script>


