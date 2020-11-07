<?php
$target_dir = $_SERVER['DOCUMENT_ROOT'].'/Online-Food-Order/Images/';
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
$error = false;

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["file"]["tmp_name"]);
  if($check == false) {
    $form_data  = array("success" => false, "dataset" => "File is not an image.");
    $error = true;

  }
}

// Check if file already exists
// if (file_exists($target_file)) {
//   $form_data  = array("success" => false, "dataset" => "Sorry, file already exists.");
//   $error = true;
// }

// Check file size
if ($_FILES["file"]["size"] > 500000) {
    $form_data  = array("success" => false, "dataset" => "Sorry, file already exists.");
    $error = true;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
    $form_data  = array("success" => false, "dataset" => "Sorry, only JPG, JPEG & PNG files are allowed.");
    $error = true;

}
if (!($error)){
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        $form_data  = array("success" => true, "dataset" => $_FILES["file"]["name"]);
    } else {
        $form_data  = array("success" => false, "dataset" => "Sorry, file could not be uploaded");
    }
}

echo json_encode($form_data);


?>
