<?php
/**
 * Comments template.
 *
 * Provided explicitly because WordPress falls back to a deprecated core
 * compatibility file when a theme has no comments.php.
 *
 * @package BKM
 */

if ( post_password_required() ) {
	return;
}
?>

<div id="comments" class="comments-area">
	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
			$bkm_count = get_comments_number();
			printf(
				/* translators: %s: number of comments */
				esc_html( _n( '%s comment', '%s comments', $bkm_count, 'bkm' ) ),
				esc_html( number_format_i18n( $bkm_count ) )
			);
			?>
		</h2>

		<ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
					'avatar_size' => 44,
				)
			);
			?>
		</ol>

		<?php
		the_comments_pagination(
			array(
				'prev_text' => '&larr;',
				'next_text' => '&rarr;',
				'class'     => 'pagination',
			)
		);
		?>
	<?php endif; ?>

	<?php if ( ! comments_open() && get_comments_number() ) : ?>
		<p class="contact-fineprint"><?php esc_html_e( 'Comments are closed.', 'bkm' ); ?></p>
	<?php endif; ?>

	<?php
	comment_form(
		array(
			'title_reply'          => __( 'Leave a comment', 'bkm' ),
			'title_reply_before'   => '<h3 class="comment-reply-title">',
			'title_reply_after'    => '</h3>',
			'class_submit'         => 'submit',
			'comment_notes_before' => '',
			'comment_notes_after'  => '',
			'label_submit'         => __( 'Post comment', 'bkm' ),
		)
	);
	?>
</div>
