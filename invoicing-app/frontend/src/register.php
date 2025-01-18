<?php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $data['username'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash password for security

    $query = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Registration failed"]);
    }

    $stmt->close();
}
$conn->close();
?>
