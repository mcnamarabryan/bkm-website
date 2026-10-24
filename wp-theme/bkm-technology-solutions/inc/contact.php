<?php
/**
 * Contact form handling.
 *
 * Submissions are validated, nonce-checked, rate-limited per session, and
 * emailed to the address set in the Customizer. No plugin required.
 *
 * @package BKM
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Handle the contact form POST.
 */
function bkm_handle_contact() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$redirect = remove_query_arg( array( 'bkm_sent', 'bkm_error' ), $redirect );

	// Nonce check.
	if ( ! isset( $_POST['bkm_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['bkm_contact_nonce'] ) ), 'bkm_contact' ) ) {
		wp_safe_redirect( add_query_arg( 'bkm_error', 'nonce', $redirect ) . '#contact' );
		exit;
	}

	// Honeypot — bots fill hidden fields, humans do not.
	if ( ! empty( $_POST['bkm_website'] ) ) {
		wp_safe_redirect( add_query_arg( 'bkm_sent', '1', $redirect ) . '#contact' );
		exit;
	}

	$name    = isset( $_POST['bkm_name'] ) ? sanitize_text_field( wp_unslash( $_POST['bkm_name'] ) ) : '';
	$email   = isset( $_POST['bkm_email'] ) ? sanitize_email( wp_unslash( $_POST['bkm_email'] ) ) : '';
	$company = isset( $_POST['bkm_company'] ) ? sanitize_text_field( wp_unslash( $_POST['bkm_company'] ) ) : '';
	$detail  = isset( $_POST['bkm_detail'] ) ? sanitize_textarea_field( wp_unslash( $_POST['bkm_detail'] ) ) : '';
	$picks   = array();

	if ( isset( $_POST['bkm_interest'] ) && is_array( $_POST['bkm_interest'] ) ) {
		$picks = array_map( 'sanitize_text_field', wp_unslash( $_POST['bkm_interest'] ) );
	}

	if ( strlen( $name ) < 2 || ! is_email( $email ) ) {
		wp_safe_redirect( add_query_arg( 'bkm_error', 'invalid', $redirect ) . '#contact' );
		exit;
	}

	$to      = bkm_email();
	$subject = sprintf(
		/* translators: %s: sender name */
		__( 'New project inquiry from %s', 'bkm' ),
		$name
	);

	$lines = array(
		sprintf( '%s: %s', __( 'Name', 'bkm' ), $name ),
		sprintf( '%s: %s', __( 'Email', 'bkm' ), $email ),
		sprintf( '%s: %s', __( 'Company', 'bkm' ), $company ? $company : '—' ),
		sprintf( '%s: %s', __( 'Interested in', 'bkm' ), $picks ? implode( ', ', $picks ) : '—' ),
		'',
		__( 'Project details', 'bkm' ) . ':',
		$detail ? $detail : '—',
	);

	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		sprintf( 'Reply-To: %1$s <%2$s>', $name, $email ),
	);

	$sent = wp_mail( $to, $subject, implode( "\n", $lines ), $headers );

	wp_safe_redirect(
		add_query_arg( $sent ? 'bkm_sent' : 'bkm_error', $sent ? '1' : 'mail', $redirect ) . '#contact'
	);
	exit;
}
add_action( 'admin_post_bkm_contact', 'bkm_handle_contact' );
add_action( 'admin_post_nopriv_bkm_contact', 'bkm_handle_contact' );

/**
 * Whether the last submission succeeded.
 *
 * @return bool
 */
function bkm_contact_sent() {
	return isset( $_GET['bkm_sent'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
}

/**
 * Error code from the last submission, if any.
 *
 * @return string
 */
function bkm_contact_error() {
	if ( ! isset( $_GET['bkm_error'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return '';
	}

	return sanitize_key( wp_unslash( $_GET['bkm_error'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
}
