<?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/Models/RESTAURANT.php');
    
    // session_start();

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;

    if($actionmode == "get_all_restaurants"){
        $open = isset($_POST['OPEN']) ? $_POST['OPEN'] : NULL;
        $args["OPEN"] = $open  == "true" ? true : false;
        $form_data = get_all_restaurants($args);
    }
   
    echo json_encode($form_data);

    function get_all_restaurants($args){
        $RESTAURANT = new RESTAURANT();
        return $RESTAURANT -> get_all_restaurants($args);
    }
?>
