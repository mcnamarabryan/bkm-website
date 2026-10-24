<?php
/**
 * Tech stack / capabilities section.
 *
 * @package BKM
 */

$bkm_caps    = bkm_capabilities();
$bkm_marquee = bkm_marquee();
?>
<section class="section" id="stack">
	<div class="shell">
		<div class="stack-grid">
			<div class="stack-intro reveal">
				<?php
				bkm_section_heading(
					array(
						'eyebrow'     => __( 'Tools we use', 'bkm' ),
						'title'       => __( 'Problem-solving', 'bkm' ),
						'italic'      => __( 'and implementation.', 'bkm' ),
						'description' => __( 'We solve complex problems and implement robust applications using PHP, Laravel, C#, and Python. Our solutions are efficient, effective, and tailored to your business requirements.', 'bkm' ),
					)
				);
				?>
			</div>

			<div class="stack-table reveal">
				<?php foreach ( $bkm_caps as $i => $group ) : ?>
					<div class="stack-row" style="transition-delay: <?php echo esc_attr( $i * 60 ); ?>ms">
						<div class="stack-group">
							<span><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></span>
							<h3><?php echo esc_html( $group['group'] ); ?></h3>
						</div>

						<ul class="stack-items">
							<?php foreach ( $group['items'] as $item ) : ?>
								<li><?php echo esc_html( $item ); ?></li>
							<?php endforeach; ?>
						</ul>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<div class="marquee mask-fade-x reveal">
		<div class="marquee-track">
			<?php
			// Duplicated so the loop is seamless at the halfway point.
			for ( $pass = 0; $pass < 2; $pass++ ) :
				foreach ( $bkm_marquee as $word ) :
					?>
					<span class="marquee-item">
						<span><?php echo esc_html( $word ); ?></span>
						<i aria-hidden="true"></i>
					</span>
					<?php
				endforeach;
			endfor;
			?>
		</div>
	</div>
</section>
