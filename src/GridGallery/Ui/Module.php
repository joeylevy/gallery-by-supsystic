<?php

/**
 * Class GridGallery_Ui_Module
 * User Interface Module
 *
 * @package GridGallery\Ui
 * @author Artur Kovalevsky
 */
class GridGallery_Ui_Module extends Rsc_Mvc_Module
{
    /**
     * @var array
     */
    protected $javascripts;

    /**
     * @var array
     */
    protected $stylesheets;

    /**
     * @var GridGallery_Ui_AssetsCollection
     */
    protected $assets;

    /**
     * {@inheritdoc}
     */
    public function onInit()
    {
        parent::onInit();

        $this->assets = new GridGallery_Ui_AssetsCollection();

        $this->preload();

        $config = $this->getEnvironment()->getConfig();

        add_action(
            $config->get('hooks_prefix') . 'after_modules_loaded',
            array($this->assets, 'load')
        );

        add_action('admin_enqueue_scripts', array($this, 'colorpicker'));
    }

    public function colorpicker()
    {
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('gg-color-picker', $this->getLocationUrl() . '/js/colorpicker.js', array('wp-color-picker'));
    }

    /**
     * Adds the asset
     * @param GridGallery_Ui_Asset $asset
     */
    public function add(GridGallery_Ui_Asset $asset)
    {
        $this->assets->add($asset);
    }

    /**
     * Returns the asset if it exists.
     * @param string $handle
     * @param mixed $default
     * @return GridGallery_Ui_Asset
     */
    public function get($handle, $default = null)
    {
        return $this->assets->get($handle, $default);
    }

    /**
     * Deletes the asset.
     * @param string $handle
     * @return bool
     */
    public function delete($handle)
    {
        return $this->assets->delete($handle);
    }

    /**
     * Preloads the assets
     */
    protected function preload()
    {
        /* URL to the plugin folder */
        $url = $this->getEnvironment()->getConfig()->get('plugin_url');

        /* CSS */
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-ui', $url . '/app/assets/css/supsystic-ui.css'));
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-jquery-ui', '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css'));
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-font-awesome', '//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css'));
		$this->add(new GridGallery_Ui_BackendStylesheet('gg-jgrowl', $url . '/app/assets/css/supsystic-jgrowl.css'));
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-tooltipster', $this->getLocationUrl() . '/css/tooltipster.css'));
        //$this->add(new GridGallery_Ui_BackendStylesheet('gg-tooltipster', '//cdn.jsdelivr.net/jquery.tooltipster/2.1.4/css/tooltipster.css'));
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-animate-css', $url . '/app/assets/css/animate.css'));
		$this->add(new GridGallery_Ui_BackendStylesheet('gg-menu-anti-duplicate-css', $url . '/app/assets/css/supsystic-for-all-admin.css'));
		$this->add(new GridGallery_Ui_BackendStylesheet('gg-minimal-css', $url . '/app/assets/css/minimal/minimal.css'));

        /* Google fonts */
        $this->add(new GridGallery_Ui_BackendStylesheet('gg-montserrat-css', 'http://fonts.googleapis.com/css?family=Montserrat'));
        $this->add(new GridGallery_Ui_Stylesheet('gg-montserrat-css', 'http://fonts.googleapis.com/css?family=Montserrat'));

        /* Javascript */
        $this->add(new GridGallery_Ui_BackendJavascript('jquery'));
        $this->add(new GridGallery_Ui_BackendJavascript('jquery-ui-dialog'));

		$this->add(new GridGallery_Ui_BackendJavascript('gg-icheck', $url . '/app/assets/js/icheck.min.js'));
		$this->add(new GridGallery_Ui_BackendJavascript('gg-types', $this->getLocationUrl() . '/js/types.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-ui-js', $url . '/app/assets/js/grid-gallery.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-lazy-load-ks', $url . '/app/assets/js/jquery.lazyload.min.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-form-serializer-js', $this->getLocationUrl() . '/plugins/grid-gallery.ui.formSerialize.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-jgrowl-js', '//cdnjs.cloudflare.com/ajax/libs/jquery-jgrowl/1.2.12/jquery.jgrowl.min.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-tooltipster-js', $this->getLocationUrl(). '/js/jquery.tooltipster.min.js' ));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-scroll-js', $this->getLocationUrl(). '/js/jquery.slimscroll.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-toolbar-js', $this->getLocationUrl() . '/plugins/grid-gallery.ui.toolbar.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-cb-observ', $this->getLocationUrl() . '/js/checkbox-observer.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-ui-toolbar', $this->getLocationUrl() . '/js/toolbar.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-common', $this->getLocationUrl() . '/js/common.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-ajax', $this->getLocationUrl() . '/js/ajax.js'));
        $this->add(new GridGallery_Ui_BackendJavascript('gg-ajax-queue', $this->getLocationUrl() . '/js/ajaxQueue.js'));
		$this->add(new GridGallery_Ui_BackendJavascript('gg-fonts', 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'));
    }

}
