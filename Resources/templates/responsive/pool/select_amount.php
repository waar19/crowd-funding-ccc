<?php
$this->layout('layout', [
    'bodyClass' => '',
    'title' => $this->text('meta-title-pool-method'),
    'meta_description' => $this->text('invest-method-title')
    ]);

$this->section('content');

?>

<?= $this->insert('pool/partials/steps_bar') ?>

<div class="container">

	<div class="row row-form">
			<div class="panel panel-default invest-container">
				<div class="panel-body">

                    <h2 class="col-sm-offset-1"><?= $this->text('pool-recharge-title') ?></h2>
                    <div class="col-sm-offset-1 pool-conditions clear-both">
	   				<?= $this->text('dashboard-my-wallet-pool-info') ?> <a data-toggle="modal" data-target="#poolModal" href=""><?= $this->text('regular-here') ?></a>
	   				</div>

                    <?= $this->insert('pool/partials/amount_box') ?>

				</div>
			</div>

	</div>

</div>

<!-- Modal -->
<div class="modal fade" id="poolModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel"><?= $this->text('invest-modal-pool-title') ?></h4>
      </div>
      <div class="modal-body">
        <?= $this->text('dashboard-my-wallet-modal-pool-info') ?>
      </div>
    </div>
  </div>
</div>


<?php $this->replace() ?>
