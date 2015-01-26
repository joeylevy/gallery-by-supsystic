<?php

/**
 * Class GridGallery_Ui_BackendJavascript
 */
class GridGallery_Ui_BackendJavascript extends GridGallery_Ui_Javascript
{
    /**
     * {@inheritdoc}
     */
    public function load()
    {
        $request = Rsc_Http_Request::create();

        if (false !== strpos($request->query->get('page'), 'supsystic-gallery')) {
            $this->register('admin_print_scripts');
        }
    }
}