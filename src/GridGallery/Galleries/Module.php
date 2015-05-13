<?php

/**
 * Class GridGallery_Galleries_Module
 *
 * @package GridGallery\Galleries
 * @author Artur Kovalevsky
 */
class GridGallery_Galleries_Module extends Rsc_Mvc_Module
{

    /**
     * {@inheritdoc}
     */
    public function onInit()
    {
        parent::onInit();

        $this->registerMenu();
        $this->registerShortcode();

        $resources = new GridGallery_Galleries_Model_Resources();

        $config = $this->getEnvironment()->getConfig();
        $prefix = $config->get('hooks_prefix');

        add_action($prefix . 'after_ui_loaded', array($this, 'loadAssets'));
        add_action($prefix . 'gallery_delete', array($resources, 'deleteByGalleryId'));

        /* Delete attachment */
        add_action(
            'grid_gallery_delete_image',
            array(
                $resources,
                'deleteByResourceId'
            )
        );

        add_action(
            'gg_delete_photo_id',
            array(
                $resources,
                'deletePhotoById'
            )
        );

        add_image_size('gg_gallery_thumbnail', 450, 250, true);

        // !!!!!! use {} for preg_* functions as start and end of the expresion.
        $pregReplaceFilter = new Twig_SimpleFilter(
            'preg_replace',
            array($this, 'pregReplace')
        );

        $httpFilter = new Twig_SimpleFilter(
            'force_http',
            array($this, 'forceHttpUrl')
        );

        $function = new Twig_SimpleFunction('translate', array($this->getController(), 'translate'));

        $twig = $this->getEnvironment()
            ->getTwig();

        $twig->addFilter($pregReplaceFilter);
        $twig->addFilter($httpFilter);
        $twig->addFunction($function);

        // It allows to extract settings for presets.
        // It will be removed in next version.
        if ($this->getRequest()->query->has('extract')) {
            $galleryId = $this->getRequest()->query->get('gallery_id');

            if (!$galleryId) {
                return;
            }

            $settings = new GridGallery_Galleries_Model_Settings();
            $entity = $settings->getByGalleryId($galleryId);

            if (!is_object($entity)) {
                add_action('admin_notices', array($this, 'extractNoticeError'));
            }

            $data = $entity->data;

            if (isset($data['cover'])) {
                $data['cover'] = '';
            }

            add_filter('extractNoticeSettings', create_function('', 'return serialize(' . var_export($data, true) . ');'));
            add_action('admin_notices', array($this, 'extractNoticeSettings'));
        }
    }

    // --- Will be removed.

    public function extractNoticeError()
    {
        echo '<div class="error"><p>This gallery is not configured.</p></div>';
    }

    public function extractNoticeSettings()
    {
        $settings = apply_filters('extractNoticeSettings', '');

        printf('<div class="updated"><p><pre style="word-wrap:break-word;">%s</pre></p></div>', $settings);
    }

    // ---

    public function pregReplace($value, $pattern, $replacement)
    {
        return preg_replace($pattern, $replacement, $value);
    }

    /**
     * Adds the http:// to the URL's without it.
     * @param  string $url URL.
     * @return string
     */
    public function forceHttpUrl($url)
    {
        if (!preg_match('/^https?:\/\//', $url)) {
            return 'http://' . $url;
        }

        return $url;
    }

    public function _loadPluginsTextDomain()
    {
        //var_dump($this);
        load_plugin_textdomain(
            'sgg',
            false,
            'supsystic-grid-gallery/app/langs/'
        );
    }

    /**
     * Loads assets
     * @param GridGallery_Ui_Module $ui An instance of the UI module.
     */
    public function loadAssets(GridGallery_Ui_Module $ui)
    {
        /* CSS */
        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-style',
            $this->getLocationUrl() . '/assets/css/grid-gallery.galleries.style.css'
        ));

        // Ok, we need to include frontend effects to backend to use it with effects preview.
        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-effects-be',
            $this->getLocationUrl() . '/assets/css/grid-gallery.galleries.effects.css'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-jqgrid',
            $this->getLocationUrl() . '/assets/css/ui.jqgrid.css'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-jquery-ui-theme-min',
            $this->getLocationUrl() . '/assets/css/jquery-ui.theme.min.css'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-jquery-ui-structure-min',
            $this->getLocationUrl() . '/assets/css/jquery-ui.structure.min.css'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-jquery-ui-jqplot-min',
            $this->getLocationUrl() . '/assets/css/jquery.jqplot.min.css'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-galleries-jquery-ui-min',
            $this->getLocationUrl() . '/assets/css/jquery-ui.min.css'
        ));

        /* JS */
        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-galleries-index-js',
            $this->getLocationUrl() . '/assets/js/grid-gallery.galleries.index.js'
        ));

        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-galleries-view-js',
            $this->getLocationUrl() . '/assets/js/grid-gallery.galleries.view.js'
        ));

        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-galleries-preview-js',
            $this->getLocationUrl() . '/assets/js/grid-gallery.galleries.preview.js'
        ));

        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-galleries-thumb-js',
            $this->getLocationUrl() . '/assets/js/grid-gallery.galleries.thumb.js'
        ));

        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-gallery-settings',
            $this->getLocationUrl() . '/assets/js/settings.js'
        ));

        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-gallery-attrchange',
            $this->getLocationUrl() . '/assets/js/attrchange.js'
        ));

        $ui->add(
            new GridGallery_Ui_BackendJavascript(
                'gg-gallery-images',
                $this->getLocationUrl() . '/assets/js/addImages.js'
            )
        );

        $ui->add(
            new GridGallery_Ui_BackendJavascript(
                'gg-galleries-pos',
                $this->getLocationUrl() . '/assets/js/position.js'
            )
        );

        $ui->add(
            new GridGallery_Ui_BackendJavascript(
                'gg-galleries-jquery-jqGrid-min',
                $this->getLocationUrl() . '/assets/js/jquery.jqGrid.min.js'
            )
        );

        $ui->add(
            new GridGallery_Ui_BackendJavascript(
                'gg-galleries-grid-locale-en',
                $this->getLocationUrl() . '/assets/js/grid.locale-en.js'
            )
        );

		$ui->add(
			new GridGallery_Ui_BackendJavascript(
				'gg-gallery-holder',
				$this->getLocationUrl() . '/assets/js/holder.js'
			)
		);

        $ui->add(new GridGallery_Ui_Javascript('jquery'));

        //$this->_loadPluginsTextDomain();
    }

    /**
     * Shortcode callback.
     * @param  array $attributes An array of the shortcode parameters.
     * @return string
     */
    public function getGallery($attributes)
    {
        $galleries = new GridGallery_Galleries_Model_Galleries();
        $twig = $this->getEnvironment()->getTwig();
        $cache = $this->getEnvironment()->getCache();
        $gallery = $galleries->getById($attributes['id']);

        if (!$gallery) {
            return;
        }

        $key = sprintf('gallery_settings_%s', $attributes['id']);

        /** @var GridGallery_Settings_Registry $registry */
        $registry = $this->getEnvironment()
            ->getModule('settings')
            ->getRegistry();

        if (true === (bool)$registry->get('cache_enabled')) {
            $ttl = $registry->get('cache_ttl');
            $cache->setTtl($ttl);

            if (null === $settings = $cache->get($key)) {
                $settings = $this->getGallerySettings($attributes['id']);
                $cache->set($key, $settings, (int)$ttl);
            }
        } else {
            $settings = $this->getGallerySettings($attributes['id']);
        }

        foreach($attributes as $key => $value) {
            if(!empty($settings->data['area'][$key]) && $settings->data['area'][$key])
                $settings->data['area'][$key] = $value;
        }

        add_action('wp_footer', array($this, 'addFrontendCss'));
        add_action('wp_footer', array($this, 'addFrontendJs'));

        if (property_exists($gallery, 'photos') && is_array($gallery->photos)) {
            $position = new GridGallery_Photos_Model_Position();

            /*foreach ($gallery->photos as $index => $row) {
                $gallery->photos[$index] = $position->setPosition(
                    $row,
                    'gallery',
                    $gallery->id
                );
            }*/

            $positions = $position->setPosition(
                $gallery->photos,
                'gallery',
                $gallery->id
            );

            foreach ($gallery->photos as $index => $row) {
                foreach ($positions as $pos) {
                    if($row->id == $pos->photo_id) {
                        $gallery->photos[$index]->position = $pos->position;
                    }
                }
            }

            $gallery->photos = $position->sort($gallery->photos);

            $cats = array();
            foreach ($gallery->photos as $photo) {
                if (property_exists($photo, 'tags') && is_array($photo->tags) && count($photo->tags) > 0) {
                    foreach ($photo->tags as $tag) {
                        if (!isset($cats[$tag])) {
                            $cats[$tag] = true;
                        }
                    }
                }
            }
        }

        $settingsModel = new GridGallery_Galleries_Model_Settings();
        $postsLenght = sizeof($settingsModel->getPostsToRender($attributes['id'])) + sizeof($settingsModel->getPagesToRender($attributes['id']));

        if($settings->data['posts']['enable']) {
            foreach ($settingsModel->getPostsToRender($attributes['id']) as $post) {
                foreach($post['categories'] as $category) {
                    if (!isset($cats[$category['name']])) {
                        $cats[$category['name']] = true;
                    }
                }
            }

            foreach ($settingsModel->getPagesToRender($attributes['id']) as $page) {
                foreach($page['categories'] as $category) {
                    if (!isset($cats[$category['name']])) {
                        $cats[$category['name']] = true;
                    }
                }
            }
        }

        foreach($gallery->photos as $photo) {
            $photo->attachment['caption'] = html_entity_decode($photo->attachment['caption']);
        }

        $template = $twig->render(
            '@galleries/shortcode/gallery.twig',
            array(
                'gallery' => $gallery,
                'settings' => is_object($settings) ? $settings->data : $settings,
                'colorbox' => $this->getEnvironment()->getModule('colorbox')
                    ->getLocationUrl(),
                'categories' => isset($cats) ? $cats : array(),
                'postsLength' => $postsLenght,
                'posts' => $settingsModel->getPostsToRender($attributes['id']),
                'pages' => $settingsModel->getPagesToRender($attributes['id']),
                'mobile' => isset($settings->data['box']['mobile']) ? $settingsModel->isMobile($settings->data['box']['mobile']) :  null,
            )
        );
        
        return preg_replace('/\s+/', ' ', trim($template));
    }

    public function addFrontendCss()
    {
        $stylesheets = $this->getFrontendCss();

        foreach ($stylesheets as $url) {
            echo '<link rel="stylesheet" type="text/css" href="' . $url . '"/>';
        }
    }

    public function addFrontendJs()
    {
        $javascripts = array(
            // $this->getLocationUrl() . '/assets/js/grid-gallery.galleries.frontend.js'
            $this->getLocationUrl() . '/assets/js/frontend.js',
            $this->getLocationUrl() . '/assets/js/jquery.photobox.js',
            $this->getLocationUrl() . '/assets/js/jquery.sliphover.js',
            'http://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js',
        );

        foreach ($javascripts as $url) {
            echo '<script type="text/javascript" src="' . $url . '"></script>';
        }
    }

    public function getFrontendCss()
    {
        $css = array(
            $this->getLocationUrl() . '/assets/css/grid-gallery.galleries.frontend.css',
            $this->getLocationUrl() . '/assets/css/grid-gallery.galleries.effects.css',
            $this->getLocationUrl() . '/assets/css/jquery.flex-images.css',
            $this->getLocationUrl() . '/assets/css/lightSlider.css',
            $this->getLocationUrl() . '/assets/css/prettyPhoto.css',
            $this->getLocationUrl() . '/assets/css/photobox.css',
            $this->getLocationUrl() . '/assets/css/photobox.ie.css',
        );

        return $css;
    }

    /**
     * Returns the gallery settings from the database.
     * If gallery is not configured, then default settings will be loaded.
     * @param int $galleryId Gallery identifier.
     * @return array
     */
    public function getGallerySettings($galleryId)
    {
        $model = new GridGallery_Galleries_Model_Settings();

        if (null === $settings = $model->get((int)$galleryId)) {
            $config = $this->getEnvironment()->getConfig();
            $config->load('@galleries/settings.php');

            $settings = unserialize($config->get('gallery_settings'));
        }

        return $settings;
    }

    /**
     * Registers the Gallery by Supsystic shortcode in the WordPress.
     */
    public function registerShortcode()
    {
        $attachment = new GridGallery_Galleries_Attachment();
        $handler = array($this, 'getGallery');
        $shortcode = $this->getEnvironment()
            ->getConfig()
            ->get('shortcode_name');

        $this->getEnvironment()
            ->getTwig()
            ->addFunction(
                new Twig_SimpleFunction('get_attachment', array(
                        $attachment,
                        'getAttachment'
                    )
                )
            );

        if (!empty($shortcode) && $shortcode !== null) {
            add_shortcode($shortcode, $handler);
        }

        // for the backward capability =< 0.2.2
        add_shortcode('grid-gallery', $handler);
    }

    /**
     * Adds the submenu item "New gallery".
     */
    public function registerMenu()
    {
        $lang = $this->getEnvironment()->getLang();
        $menu = $this->getEnvironment()->getMenu();
        $submenuNewGallery = $menu->createSubmenuItem();
        $submenuGalleries = $menu->createSubmenuItem();

        $submenuGalleries->setCapability('manage_options')
            ->setMenuSlug('supsystic-gallery&module=galleries')
            ->setMenuTitle($lang->translate('Galleries'))
            ->setPageTitle($lang->translate('Galleries'))
            ->setModuleName('galleries');

        $menu->addSubmenuItem('galleries', $submenuGalleries)
            ->register();

        $submenuNewGallery->setCapability('manage_options')
            ->setMenuSlug('supsystic-gallery&module=galleries&action=showPresets')
            ->setMenuTitle($lang->translate('New gallery'))
            ->setPageTitle($lang->translate('New gallery'))
            ->setModuleName('galleries');

        $menu->addSubmenuItem('newGallery', $submenuNewGallery)
            ->register();
    }
}
