<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['client'], $data['amount'], $data['description'])) {
    $client = $data['client'];
    $amount = $data['amount'];
    $description = $data['description'];

    $conn = new mysqli('localhost', 'root', '', 'invoicing_app');

    if ($conn->connect_error) {
        die(json_encode(['error' => 'Database connection failed']));
    }

    $stmt = $conn->prepare('INSERT INTO invoices (client, amount, description) VALUES (?, ?, ?)');
    $stmt->bind_param('sds', $client, $amount, $description);

    if ($stmt->execute()) {
        echo json_encode(['id' => $stmt->insert_id, 'client' => $client, 'amount' => $amount, 'description' => $description]);
    } else {
        echo json_encode(['error' => 'Failed to create invoice']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['error' => 'Invalid input']);
}
?>
