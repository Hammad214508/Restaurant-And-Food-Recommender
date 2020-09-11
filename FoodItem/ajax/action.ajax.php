<?php
// include_once('config.php');

// $file			=	$_FILES['file']['name'];
// $file_image		=	'';
// echo 1;
// if($_FILES['file']['name']!=""){
//     extract($_REQUEST);
// 	$infoExt        =   getimagesize($_FILES['file']['tmp_name']);
// 	if(strtolower($infoExt['mime']) == 'image/gif' || strtolower($infoExt['mime']) == 'image/jpeg' || strtolower($infoExt['mime']) == 'image/jpg' || strtolower($infoExt['mime']) == 'image/png'){
// 		$file	=	preg_replace('/\\s+/', '-', time().$file);
// 		$path   =   '../uploads/'.$file;
// 		move_uploaded_file($_FILES['file']['tmp_name'],$path);
// 		$data   =   array(
// 			'img_name'=>$file,
// 			'img_order'=>1
// 		);
// 		$insert     =   $db->insert('images',$data);
// 		if($insert){ echo 1; } else { echo 0; }
// 	}else{
// 		echo 2;
// 	}
// }
?>

<?php
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
// if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["file"]["tmp_name"]);
  if($check !== false) {
    // echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    // echo "File is not an image.";
    // $uploadOk = 0;
    echo 1;
  }
// }

// Check if file already exists
if (file_exists($target_file)) {
  // echo "Sorry, file already exists.";
  // $uploadOk = 0;
  echo 2;

}

// Check file size
if ($_FILES["file"]["size"] > 500000) {
  // echo "Sorry, your file is too large.";
  // $uploadOk = 0;
  echo 3;

}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
  // echo "Sorry, only JPG, JPEG & PNG files are allowed.";
  // $uploadOk = 0;
  echo 4;

}

// Check if $uploadOk is set to 0 by an error
// if ($uploadOk == 0) {
//   echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file

  if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
      echo 0;
    // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }

?>
