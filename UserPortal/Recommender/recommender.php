<?php 

    $actionmode = isset($_POST['actionmode']) ? $_POST['actionmode'] : NULL;

    if($actionmode == "get_recommended_food_items"){
        $available = isset($_POST['AVAILABLE']) ? $_POST['AVAILABLE'] : NULL;
        $args["USER_ID"] = isset($_POST['USER_ID']) ? $_POST['USER_ID'] : NULL;
        $args["AVAILABLE"] = $available  == "true" ? true : false;
        $args["SEARCH"] = isset($_POST['SEARCH']) ? $_POST['SEARCH'] : NULL;
        $args["SORTING"] = isset($_POST['SORTING']) ? $_POST['SORTING'] : NULL;
        $args["FILLING_RATING"] = isset($_POST['FILLING_RATING']) ? $_POST['FILLING_RATING'] : NULL;
        $args["HEALTHY_RATING"] = isset($_POST['HEALTHY_RATING']) ? $_POST['HEALTHY_RATING'] : NULL;
        $args["DIET_TYPE"] = isset($_POST['DIET_TYPE']) ? $_POST['DIET_TYPE'] : NULL;

        // $recommended = 
        $output = shell_exec("python3 ".$_SERVER['DOCUMENT_ROOT']."/Restaurant-And-Food-Recommender/CollaborativeFiltering/user_recommender.py ".$args["USER_ID"]);
        // echo "python3 ".$_SERVER['DOCUMENT_ROOT']."/Restaurant-And-Food-Recommender/CollaborativeFiltering/user_recommender.py ".$args["USER_ID"];
        echo $output;
    }

?>