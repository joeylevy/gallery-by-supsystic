<?php


class GridGallery_Overview_Module extends Rsc_Mvc_Module
{

    /**
     * {@inheritdoc}
     */
    public function onInit()
    {
        $environment = $this->getEnvironment();
        $config = $environment->getConfig();

        $this->registerMenu();

        // Client ID
        $config->add('post_id', 637);
        $config->add('post_url', 'http://supsystic.com/news/');
        $config->add('mail', 'support@supsystic.team.zendesk.com');

        $prefix = $config->get('hooks_prefix');

        add_action($prefix . 'after_ui_loaded', array(
            $this, 'loadAssets'
        ));
    }

    /**
     * Loads the assets required by the module
     */
    public function loadAssets(GridGallery_Ui_Module $ui)
    {
        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-overview-settings-js',
            $this->getLocationUrl() . '/assets/js/overview-settings.js'
        ));

        $ui->add(new GridGallery_Ui_BackendStylesheet(
            'gg-overview-css',
            $this->getLocationUrl() . '/assets/css/overview-styles.css'
        ));
    }

    public function registerMenu()
    {
        $lang = $this->getEnvironment()->getLang();
        $menu = $this->getEnvironment()->getMenu();
        $submenu = $menu->createSubmenuItem();

        $submenu->setCapability('manage_options')
            ->setMenuSlug('supsystic-gallery&module=overview')
            ->setMenuTitle($lang->translate('Overview'))
            ->setPageTitle($lang->translate('Overview'))
            ->setModuleName('overview');

        $menu->addSubmenuItem('ovewrview', $submenu)
            ->register();
    }
} 