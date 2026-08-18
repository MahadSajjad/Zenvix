<?php
/**
 * Plugin Name: Zenvix Contact API
 * Description: A secure REST API backend for the Zenvix React contact form.
 * Version: 1.0.0
 * Author: Zenvix
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register Custom Post Type for Contact Inquiries
 */
function zenvix_register_contact_inquiry_cpt() {
	$args = array(
		'labels'             => array(
			'name'               => 'Contact Inquiries',
			'singular_name'      => 'Contact Inquiry',
			'menu_name'          => 'Contact Inquiries',
			'name_admin_bar'     => 'Contact Inquiry',
			'all_items'          => 'All Inquiries',
			'view_item'          => 'View Inquiry',
		),
		'public'             => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'menu_icon'          => 'dashicons-email-alt',
		'query_var'          => false,
		'rewrite'            => false,
		'capability_type'    => 'post',
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 20,
		'supports'           => array( 'title', 'custom-fields' ), // Title will be Name - Date
		'show_in_rest'       => false, // We do not want a public GET REST endpoint for inquiries.
	);

	register_post_type( 'contact_inquiry', $args );
}
add_action( 'init', 'zenvix_register_contact_inquiry_cpt' );

/**
 * Customize the admin columns for Contact Inquiries
 */
function zenvix_contact_inquiry_columns( $columns ) {
	$columns = array(
		'cb'      => $columns['cb'],
		'title'   => 'Inquiry (Name - Date)',
		'email'   => 'Email',
		'service' => 'Service(s)',
		'budget'  => 'Budget',
		'date'    => 'Date Received'
	);
	return $columns;
}
add_filter( 'manage_contact_inquiry_posts_columns', 'zenvix_contact_inquiry_columns' );

function zenvix_contact_inquiry_custom_column( $column, $post_id ) {
	switch ( $column ) {
		case 'email':
			echo esc_html( get_post_meta( $post_id, 'email', true ) );
			break;
		case 'service':
			$services = get_post_meta( $post_id, 'service', true );
			echo esc_html( is_array( $services ) ? implode( ', ', $services ) : $services );
			break;
		case 'budget':
			echo esc_html( get_post_meta( $post_id, 'budget', true ) );
			break;
	}
}
add_action( 'manage_contact_inquiry_posts_custom_column', 'zenvix_contact_inquiry_custom_column', 10, 2 );

/**
 * Register REST API Endpoint
 */
function zenvix_register_contact_api_routes() {
	register_rest_route( 'zenvix/v1', '/contact', array(
		'methods'             => 'POST',
		'callback'            => 'zenvix_handle_contact_submission',
		'permission_callback' => '__return_true', // Public endpoint
	) );
}
add_action( 'rest_api_init', 'zenvix_register_contact_api_routes' );

/**
 * Handle Contact Form Submission
 */
function zenvix_handle_contact_submission( WP_REST_Request $request ) {
	$params = $request->get_json_params();

	// Spam Protection: Honeypot Check
	if ( ! empty( $params['_honey_pot_field'] ) ) {
		return new WP_Error(
			'spam_detected',
			'Submission rejected.',
			array( 'status' => 400 )
		);
	}

	// Rate Limiting: IP Transient Check (Max 3 per 10 mins)
	$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
	if ( $ip !== 'unknown' ) {
		$transient_key = 'zenvix_contact_' . md5( $ip );
		$attempts = get_transient( $transient_key ) ?: 0;
		if ( $attempts >= 3 ) {
			return new WP_Error(
				'rate_limit_exceeded',
				'Too many submissions. Please try again later.',
				array( 'status' => 429 )
			);
		}
		set_transient( $transient_key, $attempts + 1, 10 * MINUTE_IN_SECONDS );
	}

	$errors = array();

	// Name Validation
	$name = isset( $params['name'] ) ? sanitize_text_field( $params['name'] ) : '';
	if ( empty( $name ) ) {
		$errors['name'] = 'Name is required.';
	}

	// Email Validation
	$email = isset( $params['email'] ) ? sanitize_email( $params['email'] ) : '';
	if ( empty( $email ) || ! is_email( $email ) ) {
		$errors['email'] = 'Please provide a valid email address.';
	}

	// Service Validation
	$services = isset( $params['service'] ) ? $params['service'] : array();
	if ( empty( $services ) || ! is_array( $services ) || count( $services ) === 0 ) {
		$errors['service'] = 'Please select at least one service.';
	} else {
		// Map arrays natively as sanitize_text_field only works on strings
		$services = array_map( 'sanitize_text_field', $services );
	}

	// Budget Validation
	$budget = isset( $params['budget'] ) ? sanitize_text_field( $params['budget'] ) : '';
	$allowed_budgets = array( 'Under $500', '$500 - $1,000', '$1,000 - $2,000', '$2,000 - $3,000', '$3,000+' );
	if ( empty( $budget ) || ! in_array( $budget, $allowed_budgets, true ) ) {
		$errors['budget'] = 'Please select a valid budget.';
	}

	// Project Details Validation
	$message = isset( $params['message'] ) ? sanitize_textarea_field( $params['message'] ) : '';
	if ( empty( trim( $message ) ) ) {
		$errors['message'] = 'Project details are required.';
	}

	// Optional Fields
	$phone = isset( $params['phone'] ) ? sanitize_text_field( $params['phone'] ) : '';
	$company = isset( $params['company'] ) ? sanitize_text_field( $params['company'] ) : '';

	// If errors exist, return 400
	if ( ! empty( $errors ) ) {
		return new WP_REST_Response( array(
			'success' => false,
			'message' => 'Please check the submitted fields.',
			'errors'  => $errors,
		), 400 );
	}

	// Create Contact Inquiry Post
	$post_title = sprintf( '%s - %s', $name, wp_date( 'M j, Y, g:i a' ) );
	$post_id = wp_insert_post( array(
		'post_title'  => $post_title,
		'post_type'   => 'contact_inquiry',
		'post_status' => 'publish',
	) );

	if ( is_wp_error( $post_id ) ) {
		return new WP_Error(
			'db_error',
			'An error occurred while saving your message. Please try again.',
			array( 'status' => 500 )
		);
	}

	// Save Custom Fields
	update_post_meta( $post_id, 'name', $name );
	update_post_meta( $post_id, 'email', $email );
	update_post_meta( $post_id, 'phone', $phone );
	update_post_meta( $post_id, 'company', $company );
	update_post_meta( $post_id, 'service', $services );
	update_post_meta( $post_id, 'budget', $budget );
	update_post_meta( $post_id, 'message', $message );
	update_post_meta( $post_id, 'ip_address', $ip );

	// Trigger Email Notification
	$admin_email = get_option( 'admin_email' );
	$subject     = sprintf( 'New Contact Inquiry: %s', $name );
	$body        = sprintf(
		"Name: %s\nEmail: %s\nPhone: %s\nCompany: %s\nService(s): %s\nBudget: %s\n\nProject Details:\n%s",
		$name,
		$email,
		$phone,
		$company,
		implode( ', ', $services ),
		$budget,
		$message
	);
	$headers     = array( 'Reply-To: ' . $name . ' <' . $email . '>' );
	
	wp_mail( $admin_email, $subject, $body, $headers );

	return new WP_REST_Response( array(
		'success' => true,
		'message' => 'Your message has been received.',
	), 200 );
}
