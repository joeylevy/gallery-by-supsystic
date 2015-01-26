<?php

/**
 * Class GridGallery_Settings_Module
 * User settings module
 *
 * @package GridGallery\Settings
 * @author Artur Kovalevsky
 */
class GridGallery_Settings_Module extends Rsc_Mvc_Module
{

    /**
     * @var GridGallery_Settings_Registry
     */
    private $registry;

    /**
     * Returns the Settings Registry
     *
     * @param GridGallery_Settings_SettingsStorageInterface $storage
     * @return GridGallery_Settings_Registry
     */
    public function getRegistry(GridGallery_Settings_SettingsStorageInterface $storage = null)
    {
        if ($this->registry === null) {
            $this->registry = new GridGallery_Settings_Registry(
                $this->getEnvironment()->getConfig()->get('hooks_prefix'),
                $storage
            );
        }

        return $this->registry;
    }

    /**
     * {@inheritdoc}
     */
    public function onInit()
    {
        $prefix = $this->getEnvironment()->getConfig()->get('hooks_prefix');

        add_action($prefix . 'after_ui_loaded', array(
            $this, 'loadAssets'
        ));

        $menu = $this->getEnvironment()->getMenu();
        $submenu = $menu->createSubmenuItem();
        $submenu->setCapability('manage_options')
            ->setMenuSlug('supsystic-gallery&module=settings')
            ->setMenuTitle('Settings')
            ->setPageTitle('Settings')
            ->setModuleName('settings');

        //Uncomment to enable settings menu tab
        //$menu->addSubmenuItem('settings', $submenu)->register();
    }

    public function onInstall()
    {
        parent::onInstall();

        $registry = $this->getRegistry();
        //Set this option to 1 to enable sending statistic
        $registry->set('send_stats', 0);
    }

    /**
     * Loads the assets required by the module
     */
    public function loadAssets(GridGallery_Ui_Module $ui)
    {
        $ui->add(new GridGallery_Ui_BackendJavascript(
            'gg-settings-save-js',
            $this->getLocationUrl() . '/assets/js/grid-gallery.settings.clearCache.js'
        ));
    }
}