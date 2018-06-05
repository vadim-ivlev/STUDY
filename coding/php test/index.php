<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>

</head>
<body>

<h1>My first PHP page</h1>

<?php

echo "Hello ".$_SESSION['name']."<BR>";
if (empty( $_SESSION['name'])){
    echo '<br><a href="login.php">login</a><br><br>';
}
else {
    echo '<br><a href="logout.php">logout</a><br><br>';

$conn = mysqli_connect("127.0.0.1", "root", "rootroot", "employees");
    if (!$conn) {
        echo "DDDDDDDDD<br>". mysqli_connect_error();
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT emp_no, first_name, last_name FROM employees LIMIT 10";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            echo "emp_no: " . $row["emp_no"]. " - Name: " . $row["first_name"]. " " . $row["last_name"]. "<br>";
        }
    } else {
        echo "0 results";
    }

    mysqli_close($conn);



}
// echo "<pre>";

// foreach ($GLOBALS as $v){
//     // echo "$k : ";
//     print_r($v);
//     echo '<br>';
// }
// echo "</pre>";

?>

</body>
</html>