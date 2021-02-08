<head>
    <title>Contact</title>
    <?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/header.php') ?>
</head>
<body>
    <?php
    include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/navigation.php');
    if(!$_SESSION["logged_in"][0][0]["USER_ID"]){
        header('location: /Restaurant-And-Food-Recommender/Login/User/user_login.php');
    }
    ?>

    <div class="container">
        <div id="error" class="alert alert-danger text-center" role="alert" style="display:none;"></div>
    </div>

    <div class="container-fluid">
        <div class="jumbotron">
            <h1> Contact </h1>
            <p>Contact us from here</p>
        </div>
    </div>
    <div class="container" >
        <div class="col-md-5 mb-5 text-center" style="float: none; margin: 0 auto; border:1px solid black;  background-color:#e9ecef;">
            <h3 class="mt-3 text-center mb-3" style="font-size: 30px;"> Contact Form</h3>

            <input id="name" type="text" class="form-control form-group" id="name" name="name" placeholder="Name" required autofocus="">
            <input id="email" type="email" class="form-control form-group" id="email" name="email" placeholder="Email" required>
            <input id="subject" type="text" class="form-control form-group" id="subject" name="subject" placeholder="Subject" required>
            <textarea id="message" class="form-control form-group" type="textarea" id="message" name="message" placeholder="Message" maxlength="140" rows="7"></textarea>
            <span class="text-left" style="font-size:12px;"><p>Max Character length : 140 </p></span>
            
            <button id="submit" type="button" class="btn btn-secondary mb-3">Submit </button>        
        </div>
    </div>
            

</body>

<?php include ($_SERVER['DOCUMENT_ROOT'].'/Restaurant-And-Food-Recommender/footer.php') ?>
<script src="<?php global $basedir; ?>/Restaurant-And-Food-Recommender/Contact/contact.js"></script>
