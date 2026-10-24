<?php
/**
 * Search results.
 *
 * @package BKM
 */

get_header();
?>

<div class="archive-head">
	<div class="shell">
		<span class="eyebrow"><?php esc_html_e( 'Search', 'bkm' ); ?></span>

		<h1>
			<?php
			printf(
				/* translators: %s: search query */
				esc_html__( 'Results for “%s”', 'bkm' ),
				esc_html( get_search_query() )
			);
			?>
		</h1>

		<p>
			<?php
			$bkm_found = (int) $GLOBALS['wp_query']->found_posts;
			printf(
				/* translators: %s: number of results */
				esc_html( _n( '%s result', '%s results', $bkm_found, 'bkm' ) ),
				esc_html( number_format_i18n( $bkm_found ) )
			);
			?>
		</p>

		<?php get_search_form(); ?>
	</div>
</div>

<div class="shell">
	<?php if ( have_posts() ) : ?>
		<div class="post-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/card', 'post' );
			endwhile;
			?>
		</div>

		<?php bkm_pagination(); ?>
	<?php else : ?>
		<div class="prose">
			<p><?php esc_html_e( 'No matches. Try a different phrase, or get in touch and we will point you in the right direction.', 'bkm' ); ?></p>
			<?php get_search_form(); ?>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
