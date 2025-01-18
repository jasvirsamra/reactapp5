<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data['username'];
    $password = $data['password'];

    $query = "SELECT password FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($hashedPassword);

    if ($stmt->fetch() && password_verify($password, $hashedPassword)) {
        echo json_encode(["message" => "Login successful"]);
    } else {
        echo json_encode(["error" => "Invalid credentials"]);
    }

    $stmt->close();
}
$conn->close();
?>
