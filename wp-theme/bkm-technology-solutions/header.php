<?php
/**
 * Site header.
 *
 * @package BKM
 */

$bkm_site = bkm_site();
$bkm_nav  = bkm_nav_items();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="sr-only" href="#main"><?php esc_html_e( 'Skip to content', 'bkm' ); ?></a>

<header class="site-header" id="site-header">
	<div class="shell header-inner">
		<a class="brand-link" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php echo esc_attr( $bkm_site['name'] . ' — home' ); ?>">
			<?php bkm_brand_lockup( 'nav', true ); ?>
		</a>

		<nav class="primary-nav" aria-label="<?php esc_attr_e( 'Primary', 'bkm' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'primary-menu',
						'depth'          => 1,
						'fallback_cb'    => 'bkm_nav_fallback',
						'link_before'    => '',
						'walker'         => new BKM_Nav_Walker(),
					)
				);
			} else {
				bkm_nav_fallback();
			}
			?>
		</nav>

		<div class="header-actions">
			<a class="header-cta" href="<?php echo esc_url( home_url( '/#contact' ) ); ?>" data-scroll="#contact">
				<?php esc_html_e( 'Start a project', 'bkm' ); ?>
				<?php bkm_icon( 'arrow', 16 ); ?>
			</a>

			<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-sheet" aria-label="<?php esc_attr_e( 'Open menu', 'bkm' ); ?>">
				<?php bkm_icon( 'menu', 16 ); ?>
			</button>
		</div>
	</div>

	<div class="scroll-progress" aria-hidden="true">
		<div class="scroll-progress-bar"></div>
	</div>
</header>

<div class="mobile-sheet" id="mobile-sheet" aria-hidden="true">
	<div class="mobile-backdrop"></div>
	<div class="mobile-panel">
		<?php foreach ( $bkm_nav as $item ) : ?>
			<button type="button" class="mobile-link" data-scroll="#<?php echo esc_attr( $item['id'] ); ?>">
				<?php echo esc_html( $item['label'] ); ?>
				<?php bkm_icon( 'arrow', 16 ); ?>
			</button>
		<?php endforeach; ?>

		<a class="mobile-cta" href="<?php echo esc_url( home_url( '/#contact' ) ); ?>" data-scroll="#contact">
			<?php esc_html_e( 'Start a project', 'bkm' ); ?>
		</a>
	</div>
</div>

<main id="main">
