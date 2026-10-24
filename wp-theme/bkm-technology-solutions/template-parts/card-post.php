<?php
/**
 * A single post card, used by the blog index, archives, and search results.
 *
 * Kept in one place so the three listing templates stay identical.
 *
 * @package BKM
 */

?>
<article <?php post_class( 'post-card' ); ?>>
	<?php if ( has_post_thumbnail() ) : ?>
		<a class="post-card__thumb" href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1">
			<?php the_post_thumbnail( 'large', array( 'loading' => 'lazy', 'alt' => '' ) ); ?>
		</a>
	<?php endif; ?>

	<div class="post-card__body">
		<span class="post-card__date"><?php echo esc_html( get_the_date() ); ?></span>

		<h2 class="post-card__title">
			<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
		</h2>

		<p class="post-card__excerpt">
			<?php echo esc_html( wp_trim_words( get_the_excerpt(), 22, '…' ) ); ?>
		</p>

		<a class="post-card__more" href="<?php the_permalink(); ?>">
			<?php esc_html_e( 'Read more', 'bkm' ); ?>
			<?php bkm_icon( 'arrow-right', 12 ); ?>
		</a>
	</div>
</article>
