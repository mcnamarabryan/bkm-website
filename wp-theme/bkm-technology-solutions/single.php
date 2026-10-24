<?php
/**
 * Single post.
 *
 * @package BKM
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<article <?php post_class(); ?>>
		<header class="entry-header">
			<div class="shell">
				<div class="entry-header__inner">
					<span class="eyebrow"><?php echo esc_html( get_the_date() ); ?></span>

					<h1 class="entry-title"><?php the_title(); ?></h1>

					<div class="entry-meta">
						<?php if ( is_sticky() ) : ?>
							<span class="sticky-badge"><?php esc_html_e( 'Pinned', 'bkm' ); ?></span>
						<?php endif; ?>

						<span><?php echo esc_html( get_the_author() ); ?></span>
						<span class="dot" aria-hidden="true"></span>
						<span><?php echo esc_html( get_the_date() ); ?></span>

						<?php if ( has_category() ) : ?>
							<span class="dot" aria-hidden="true"></span>
							<span><?php echo wp_kses_post( get_the_category_list( ', ' ) ); ?></span>
						<?php endif; ?>
					</div>
				</div>

				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="entry-featured">
						<?php the_post_thumbnail( 'full' ); ?>
					</figure>
				<?php endif; ?>
			</div>
		</header>

		<div class="shell">
			<div class="prose">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="pagination">',
						'after'  => '</div>',
					)
				);
				?>
			</div>

			<?php if ( has_tag() ) : ?>
				<div class="entry-tags">
					<span class="tag-label"><?php esc_html_e( 'Tags', 'bkm' ); ?></span>
					<?php
					$bkm_tags = get_the_tags();
					if ( $bkm_tags ) :
						foreach ( $bkm_tags as $bkm_tag ) :
							?>
							<a href="<?php echo esc_url( get_tag_link( $bkm_tag->term_id ) ); ?>">
								<?php echo esc_html( $bkm_tag->name ); ?>
							</a>
							<?php
						endforeach;
					endif;
					?>
				</div>
			<?php endif; ?>

			<?php
			$bkm_prev = get_previous_post();
			$bkm_next = get_next_post();

			if ( $bkm_prev || $bkm_next ) :
				?>
				<nav class="post-nav" aria-label="<?php esc_attr_e( 'Post navigation', 'bkm' ); ?>">
					<?php if ( $bkm_prev ) : ?>
						<a href="<?php echo esc_url( get_permalink( $bkm_prev ) ); ?>">
							<span class="kicker"><?php esc_html_e( 'Previous', 'bkm' ); ?></span>
							<span class="label"><?php echo esc_html( get_the_title( $bkm_prev ) ); ?></span>
						</a>
					<?php endif; ?>

					<?php if ( $bkm_next ) : ?>
						<a class="next" href="<?php echo esc_url( get_permalink( $bkm_next ) ); ?>">
							<span class="kicker"><?php esc_html_e( 'Next', 'bkm' ); ?></span>
							<span class="label"><?php echo esc_html( get_the_title( $bkm_next ) ); ?></span>
						</a>
					<?php endif; ?>
				</nav>
			<?php endif; ?>

			<?php
			if ( comments_open() || get_comments_number() ) {
				echo '<div class="comments">';
				comments_template();
				echo '</div>';
			}
			?>
		</div>
	</article>
	<?php
endwhile;

get_footer();
