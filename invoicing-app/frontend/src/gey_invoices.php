<?php
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'invoicing_app');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$offset = ($page - 1) * $limit;

$result = $conn->query("SELECT COUNT(*) AS total FROM invoices");
$total = $result->fetch_assoc()['total'];

$result = $conn->query("SELECT * FROM invoices LIMIT $offset, $limit");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode([
    'items' => $data,
    'totalPages' => ceil($total / $limit)
]);

$conn->close();
?>
