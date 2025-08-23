<?php
// Simple email test script
header('Content-Type: text/html');

echo "<h1>Email Function Test</h1>";

// Check if mail function exists
if (!function_exists('mail')) {
    echo "<p style='color: red;'>❌ Mail function not available on this server</p>";
    exit;
}

echo "<p style='color: green;'>✅ Mail function is available</p>";

// Try to send a test email
$to = "david.cit1999@gmail.com";
$subject = "Test Email from " . $_SERVER['HTTP_HOST'];
$message = "This is a test email sent at " . date('Y-m-d H:i:s') . "\n\nFrom: " . $_SERVER['HTTP_HOST'];
$headers = "From: test@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "<h2>Attempting to send test email...</h2>";
echo "<p><strong>To:</strong> $to</p>";
echo "<p><strong>Subject:</strong> $subject</p>";

$result = mail($to, $subject, $message, $headers);

if ($result) {
    echo "<p style='color: green;'>✅ Test email sent successfully!</p>";
} else {
    echo "<p style='color: red;'>❌ Failed to send test email</p>";
    
    // Get last error
    $last_error = error_get_last();
    if ($last_error) {
        echo "<p><strong>Last error:</strong> " . $last_error['message'] . "</p>";
    }
}

echo "<h2>Server Info</h2>";
echo "<p><strong>Host:</strong> " . $_SERVER['HTTP_HOST'] . "</p>";
echo "<p><strong>Server Software:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p><strong>PHP Version:</strong> " . phpversion() . "</p>";

// Check sendmail path
if (ini_get('sendmail_path')) {
    echo "<p><strong>Sendmail Path:</strong> " . ini_get('sendmail_path') . "</p>";
} else {
    echo "<p style='color: orange;'>⚠️ No sendmail path configured</p>";
}

// Check SMTP settings
if (ini_get('SMTP')) {
    echo "<p><strong>SMTP Server:</strong> " . ini_get('SMTP') . "</p>";
} else {
    echo "<p style='color: orange;'>⚠️ No SMTP server configured</p>";
}
?>