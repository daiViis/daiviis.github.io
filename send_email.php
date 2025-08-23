<?php
// Simple, robust PHP mailer
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Check if it's a POST request
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception('Only POST requests allowed');
    }
    
    // Get and validate input
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        throw new Exception('All fields are required');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Email configuration
    $to = "david.cit1999@gmail.com";
    $subject = "New Contact from Digital Magic Website";
    
    // Simple text email (more reliable than HTML)
    $email_body = "New Contact Message\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "Sent from: " . $_SERVER['HTTP_HOST'] . "\n";
    $email_body .= "Date: " . date('Y-m-d H:i:s') . "\n";
    
    // Simple headers
    $headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // Try to send email (removed @ to see actual errors)
    $success = mail($to, $subject, $email_body, $headers);
    
    if ($success) {
        echo json_encode([
            'success' => true, 
            'message' => 'Message sent successfully!'
        ]);
    } else {
        // Check if mail function exists
        if (!function_exists('mail')) {
            throw new Exception('Mail function not available on this server');
        }
        
        // Get last error for better debugging
        $last_error = error_get_last();
        $error_message = 'Failed to send email';
        
        if ($last_error && strpos($last_error['message'], 'mail') !== false) {
            $error_message .= ': ' . $last_error['message'];
        }
        
        throw new Exception($error_message);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false, 
        'message' => $e->getMessage()
    ]);
}
?>