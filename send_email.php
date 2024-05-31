<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $full_name = $_POST['full_name'];
    $phone = $_POST['phone'];
    $description = $_POST['description'];

    $to = "ozheavi@gmail.com";
    $subject = "New Contact Form Submission";
    $message = "Full Name: $full_name\n";
    $message .= "Phone: $phone\n";
    $message .= "Description:\n$description";

    $headers = "From: no-reply@yourdomain.com"; // Replace with your domain

    if (mail($to, $subject, $message, $headers)) {
        echo "Thank you! Your message has been sent.";
    } else {
        echo "Sorry, something went wrong. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
