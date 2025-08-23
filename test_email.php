<?php
// Test script to check if PHP mail works
header('Content-Type: text/html; charset=UTF-8');

echo "<h1>PHP Mail Test</h1>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p>✅ PHP mail() function is available</p>";
    
    // Test sending email
    $to = "david.cit1999@gmail.com";
    $subject = "Test from PHP";
    $message = "This is a test email from your website.";
    $headers = "From: test@" . $_SERVER['HTTP_HOST'];
    
    echo "<p>📧 Attempting to send test email...</p>";
    
    $success = @mail($to, $subject, $message, $headers);
    
    if ($success) {
        echo "<p>✅ Email sent successfully!</p>";
    } else {
        echo "<p>❌ Failed to send email. Check server configuration.</p>";
        
        // Check common issues
        echo "<h3>Possible issues:</h3>";
        echo "<ul>";
        echo "<li>Server doesn't have mail server configured</li>";
        echo "<li>SMTP settings missing</li>";
        echo "<li>PHP mail disabled by hosting provider</li>";
        echo "<li>Need to use SMTP authentication (like PHPMailer)</li>";
        echo "</ul>";
    }
} else {
    echo "<p>❌ PHP mail() function is NOT available on this server</p>";
}

// Show PHP and server info
echo "<h3>Server Info:</h3>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['HTTP_HOST'] . "</p>";
echo "<p>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</p>";

// Check if we're running locally
if (isset($_SERVER['HTTP_HOST']) && 
    (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
     strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false)) {
    echo "<p>⚠️ Running on localhost - email likely won't work without mail server setup</p>";
}
?>