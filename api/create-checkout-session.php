<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once('vendor/autoload.php');

\Stripe\Stripe::setApiKey('sk_test_51PEHhaAN06kC7AVBaA8kwj4H4bHgjveG3sqeIQk2qljkVZxvFUyz4qBhAxrKLX2D7kriqAWqL9EiTuAVeHzHuV4v00FlS7senc'); // Set your secret API key


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requestData = json_decode(file_get_contents("php://input"), true);

    $name = $requestData['name'];
    $email = $requestData['email'];
    $address1 = $requestData['address'];
    $postCode = $requestData['postCode'];
    $cartItems = $requestData['cartItems'];

    try {
        $session = \Stripe\Checkout\Session::create([
            'payment_method_types' => ['card'],
            'line_items' => array_map(function($item) {
                return [
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => intval($item['price'] * 100), // Amount in cents
                        'product_data' => [
                            'name' => $item['productName'],
                        ],
                    ],
                    'quantity' => 1,
                ];
            }, $cartItems),
            'mode' => 'payment',
            'success_url' => 'https://yourwebsite.com/success',
            'cancel_url' => 'http://localhost:3000/checkout',
        ]);

        echo json_encode(['sessionId' => $session->id]);
    } catch (Exception $e) {
        $errorMessage = 'Failed to create checkout session. Please try again later.';
        if ($e->getMessage()) {
            $errorMessage .= ' Error: ' . $e->getMessage();
        }
        echo json_encode(['error' => $errorMessage]);
        error_log('Error creating checkout session: ' . $e->getMessage());
    }
}
