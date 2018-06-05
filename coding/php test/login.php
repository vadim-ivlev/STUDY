<?php
session_start();

if( ! empty( $_POST['name'])){
    $_SESSION['name']=$_POST['name'];
    // echo "<a href='logout.php'>logout<a><br><br>";
    header( 'Location: /', true, 307 ); 
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script>
</head>
<body>
<a href="index.php">index</a>
<br>
<br>
<form action="login.php" method="post">
Name: <input type="text" name="name"><br>
<input type="submit">
</form>
</body>
</html>