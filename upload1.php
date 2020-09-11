<form action="upload.php" method="post" enctype="multipart/form-data">
  Select image to upload:
  <input type="file" name="fileToUpload" id="fileToUpload">
  <input type="submit" value="Upload Image" name="submit">
</form>

<img id="blah" alt="your image" width="100" height="100" />

<input type="file" onchange="document.getElementById('blah').src = window.URL.createObjectURL(this.files[0])">
