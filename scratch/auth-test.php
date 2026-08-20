<?php
header('Content-Type: application/json');

// Do not echo the actual value!
$has_auth = false;
$scheme = null;

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $has_auth = true;
    $scheme = explode(' ', $_SERVER['HTTP_AUTHORIZATION'])[0];
} elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
    $has_auth = true;
    $scheme = explode(' ', $_SERVER['REDIRECT_HTTP_AUTHORIZATION'])[0];
}

echo json_encode([
    'authorization_present' => $has_auth,
    'authorization_scheme' => $scheme
]);
